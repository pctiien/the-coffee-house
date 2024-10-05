const Order = require('../models/Order')
const User = require('../models/User')
const Voucher = require('../models/Voucher')
const Product = require('../models/Product')
const Topping = require('../models/Topping')
const Size = require('../models/Size')
const OrderItem = require('../models/OrderItem')


const AppError = require('../utils/appError')
const QueryHelper = require('../utils/QueryHelper')


// Create Order - POST .../
const createOrder = async(req,res,next)=>{

    try{

        const orderData = req.body 

        let totalMoney = 0

        const user = await User.findOne({_id: orderData.userId})
        if(!user)
        {
            return new AppError("User not found",400)
        }



        for (const item of orderData.orderItemIds) {

            const product = await Product.findOne({ _id: item.productId });

            if (!product) {

                return next(new AppError("Product not found", 400));

            }

            let total = product.price * item.quantity;

            // Topping
            for (const toppingId of item.toppingIds) {

                const topping = await Topping.findOne({ _id: toppingId });

                if (!topping) {

                    return next(new AppError("Topping not found", 400));
                }

                total += topping.priceAddition;
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
                toppingIds: item.toppingIds,
                total: total
            });

            totalMoney += total
        }

        if(orderData.voucherUsed)
        {
            const voucher = await Voucher.findOne({code: orderData.voucherId})
            if(!voucher)
            {
                return new AppError("Voucher not found",400)
            }

            totalMoney = totalMoney*(1-voucher.discountValue)

        }



        const order = await  Order.create({
            userId : orderData.userId,
            address : orderData.address,
            total : totalMoney ,
            orderItemIds : orderData.orderItemIds,
            status : 'Pending',
            voucherUsed : orderData.voucherUsed
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