const jwt = require('jsonwebtoken')
const User = require('../models/User')
const signToken = (user)=>{
    const token = jwt.sign(
        {
            id: user._id,
            phone: user.phone,
            email : user.email,
            name : user.name ,
            role: user.role

        },
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRE)
    return token 
}

const verifyToken = async(token)=>{

    const decodedToken = await jwt.verify(token,process.env.JWT_SECRET)
    
    return User.findById(decodedToken.id)
}

module.exports = {signToken,verifyToken}