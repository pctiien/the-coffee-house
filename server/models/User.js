const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true 
    },
    name : {
        type: String,
        required: true
    },
    address : {
        type : String
    },
    age: {
        type: Number
    },
    role: [{
        type: String ,
        default: 'user'
    }]
},{
    timestamps: true
})

const User = mongoose.model('User',userSchema) 
module.exports = User