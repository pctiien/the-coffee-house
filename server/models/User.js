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

userSchema.pre('save',function(next){

    if(this.password.length < 6){
        return next(new Error('Password must be at least 6 characters long'))
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if(!emailRegex.test(this.email))
    {
        return next(new Error('Invalid email format'))
    }

    next()
})

const User = mongoose.model('User',userSchema) 
module.exports = User