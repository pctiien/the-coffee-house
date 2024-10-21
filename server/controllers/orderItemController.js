const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const Product = require('../models/Product')

const AppError = require('../utils/appError')
const QueryHelper = require('../utils/QueryHelper')


// Get Order Items By Order- Get ...?orderId=:orderId
const getOrderItemsByOrder = async(req,res,next)=>{
    try{
        const order = await Order.findById(req.query.orderId)
        if(!order)
        {
            return next(new AppError('Order not found',404))
        }

        const orderItems = await OrderItem.find(
            {_id : {$in: order.orderItemIds}}
        ).populate('productId').populate('sizeId').populate('toppings.toppingId')
        
        res.status(200).json({
            result : {
                orderItems,
            },
            status: 'success'
        })
    }catch(err)
    {
        next(err)
    }
}

module.exports = {getOrderItemsByOrder}