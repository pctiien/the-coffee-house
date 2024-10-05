const mongoose = require('mongoose') 
const toppingSchema = new mongoose.Schema({
    toppingId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Topping',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
})
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
    toppings:[{
        type: toppingSchema,
    }],
    sizeId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Size'
    }
})

const OrderItem = mongoose.model('OrderItem',orderItemSchema) 
module.exports = OrderItem 