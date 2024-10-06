const mongoose = require('mongoose')
const AppError = require('../utils/appError')
const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique : true
    },
    phone : {
        type: String,
        required : true,
        unique : true

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

userSchema.pre('save',function(next){

    if(this.password.length < 6){
        return next(new AppError('Password must be at least 6 characters long',400))
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if(!emailRegex.test(this.email))
    {
        return next(new AppError('Invalid email format',400))
    }

    next()
})

const User = mongoose.model('User',userSchema) 
module.exports = User