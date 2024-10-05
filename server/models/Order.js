const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
    }
}, { _id: false });
const orderSchema = new mongoose.Schema({

    user: {
        type: userInfoSchema,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    paymentMethod :{
        type: String,
        enum : ['Cash','Momo','ZaloPay','ShopeePay'],
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

orderSchema.pre('remove', async function (next) {
    const orderItemIds = this.orderItemIds;
    await OrderItem.deleteMany({ _id: { $in: orderItemIds } });
    next();
});

const Order = mongoose.model('Order',orderSchema) 
module.exports = Order