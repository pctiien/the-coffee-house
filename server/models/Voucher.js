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
    discountType:{
        type: String,
        enum: ['PERCENTAGE','FIXED_AMOUNT']
    },
    discountValue:{
        type: Number,
        required: true,
    },
    minimumOrderValue:{
        type: Number,
        default : 0 
    },
    description:{
        type: String,
        required: true
    },
    validTo:{
        type: Date,
        validate: {
            validator: (value)=>{
                return value > Date.now()
            },
            message: 'Expired day must be a future date'
        }
    },
    imageUrl:{
        type: String
    },

},{
    timestamps: true
})

const Voucher = mongoose.model('Voucher',voucherSchema) 
module.exports = Voucher