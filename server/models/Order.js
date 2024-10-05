const mongoose = required('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address:{
        type: String,
        required: true
    },
    paymentMethod :{
        type: String,
        enum : ['Cash','Momo','Zalopay','ShopeePay'],
        required: true
    },
    deliveryTime: {
        type: Date,
        required: true, 
    },
    total : {
        type: Number,
        required: true
    },
    orderItemIds: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    status :{
        type:String,
        enum: ['Pending','Delivering','Completed','Rejected'],
        default: 'Pending'
    },
    voucherUsed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher', 
        default: null 
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order',orderSchema) 
module.exports = Order