const mongoose = require('mongoose') 

const voucherSchema = new mongoose.Schema({
    code : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 9,
        maxlength: 12
    },
    discountValue:{
        type: Number,
        required: true,
    },
    voucherDescription:{
        type: String,
        required: true
    },
    expiredDay:{
        type: Date,
        validate: {
            validator: (value)=>{
                return value > Date.now()
            },
            message: 'Expired day must be a future date'
        }
    },
    remainingCount:{
        type: Number,
    }
},{
    timestamps: true
})

const Voucher = mongoose.model('Voucher',voucherSchema) 
module.exports = Voucher