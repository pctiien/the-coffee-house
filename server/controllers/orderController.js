const Order = require('../models/Order')
const User = require('../models/User')
const Voucher = require('../models/Voucher')
const Product = require('../models/Product')
const {Topping} = require('../models/Topping')
const {Size} = require('../models/Size')
const OrderItem = require('../models/OrderItem')


const AppError = require('../utils/appError')
const QueryHelper = require('../utils/QueryHelper')

// Get Order - Get .../
const getAllOrders = async(req,res,next)=>{
    const queryBuilder = new QueryHelper(Order.find(),req.query).executeQuery()
    const orders = await queryBuilder.query
    const total = await Order.countDocuments()
    res.status(200).json({
        result : {
            orders,
            total
        },
        status: 'success'
    })
}
// Update Order - PATCH .../:id
const updateOrder = async(req,res,next)=>{
    try{
        const data = req.body
        const order = await Order.findById(req.params.id)
        if(!order)
        {
            return next(new AppError('Order not found',404))
        }
        Object.assign(order,data)
        order.save()
        return res.status(200).json({
            status: 'success',
            result : {
                order
            }
        });

    }catch(err)
    {
        next(err)
    }
}

// Create Order - POST .../
const createOrder = async(req,res,next)=>{
    
    try{

        const orderData = req.body 
        const orderItemIds = []
        let totalMoney = 0
        let afterDiscount = 0
        if(orderData.user.userId)
        {
            const user = await User.findOne({_id: orderData.userId})
            if(!user)
            {
                    return next(new AppError("User not found",400))
            }
        }
        
        // Handle cast delivery time
        const { date, time } = orderData.deliveryTime;
        const timeFormatted = time.padStart(5, '0');
        const deliveryDateTimeStr = `${date}T${timeFormatted}:00.000Z`;
        const deliveryDateTime = new Date(deliveryDateTimeStr)
        if (isNaN(deliveryDateTime.getTime())) { 
            return next(new AppError("Invalid delivery time", 400));
        }

        const localDateTime = deliveryDateTime.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });

        for (const item of orderData.orderItemIds) {

            const product = await Product.findOne({ _id: item.productId });

            if (!product) {

                return next(new AppError("Product not found", 400));

            }

            let total = product.price * item.quantity;

            // Topping
            for (const toppingItem of item.toppings) {

                const topping = await Topping.findOne({ _id: toppingItem.toppingId });

                if (!topping) {

                    return next(new AppError("Topping not found", 400));
                }

                total += topping.priceAddition*toppingItem.quantity
            }

            // Size
            const size = await Size.findOne({ _id: item.sizeId });
            if (!size) {

                return next(new AppError("Size is required", 400));

            }

            total += size.priceAddition;

            const orderItem = await OrderItem.create({
                productId: item.productId,
                quantity: item.quantity,
                sizeId: item.sizeId,
                toppings: item.toppings,
                total: total
            });

            orderItemIds.push(orderItem._id)

            totalMoney += total

        }

        if(orderData.voucherUsed)
        {
            const voucher = await Voucher.findOne({code: orderData.voucherUsed.code})
            if(!voucher)
            {
                return next(new AppError("Voucher not found",400))
            }
            if (voucher.validTo < new Date()) {
                return next(new AppError("Voucher is expired", 400));
            }
            switch(voucher.discountType)
            {
                case 'PERCENTAGE': {
                    if(voucher.discountValue > 1 || voucher.discountValue < 0) break 
                    afterDiscount = totalMoney*(1-voucher.discountValue)
                    if (totalMoney < 0) {
                        totalMoney = 0;
                    }
                    break;
                }
                case 'FIXED_AMOUNT':{
                    afterDiscount = totalMoney - voucher.discountValue
                    break
                }
                default:   
                    return next(new AppError("Invalid voucher type", 400));


            }

        }



        const order = await  Order.create({
            user : orderData.user,
            address : orderData.address,
            originalTotal : totalMoney ,
            orderItemIds : orderItemIds,
            status : orderData.status || 'Pending',
            voucherUsed : orderData.voucherUsed,
            paymentMethod: orderData.paymentMethod,
            deliveryTime: deliveryDateTime,
            afterDiscount: afterDiscount
        }) 
        
        res.status(200).json({
            status: 'Success',
            result : {
                order
            }
        })


    }catch(e){
        next(e)
    }
}

module.exports = {createOrder,getAllOrders,updateOrder}