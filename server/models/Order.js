const mongoose = required('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
        enum: ['Pending','Completed','Rejected'],
        default: 'Pending'
    },
    voucherUsed : [{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }]
},{
    timestamps: true
})

const Order = mongoose.model('Order',orderSchema) 
module.exports = Order