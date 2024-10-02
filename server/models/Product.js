const mongoose = require('mongoose') 

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    price : {
        type : Number,
        required : true     
    },
    categoryId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    toppingIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topping'
    }],
    description:{
        type: String,
        default : ''
    }

},{
    timestamps: true
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product