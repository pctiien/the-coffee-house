const mongoose = require('mongoose') 

const orderItemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    total : {
        type: Number
    },
    toppingIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topping'
    }],
    sizeId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Size'
    }
})

const OrderItem = mongoose.model('OrderItem',orderSchema) 
module.exports = OrderItem 