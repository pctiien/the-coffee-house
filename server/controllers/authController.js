const User = require('../models/User')
const bcrypt = require('bcrypt')
const AppError = require('../utils/appError')
const jwtToken = require('../utils/jwtToken')
// Signup - POST / 

const signUp = async (req,res,next)=>{

    try{

        const userData = req.body 

        const existUser = await User.findOne({
            $or: [
                {email: userData.email},
                {phone: userData.phone}
            ]
        })
    
        if(existUser)
        {
            return next(new AppError('User already exists',400))
        }
    
        const saltRounds = 10 
        const hashedPwd = await bcrypt.hash(userData.password,saltRounds)
    
        userData.password = hashedPwd 
        
        const user = new User(userData)
    
        await user.save()
    
        res.status(201).json({
            status: 'success',
        })

    }catch(e){
        next(e)
    }

}

// Login - POST 

const login = async ( req,res,next)=>{

    try{
        const authData = req.body 

        const existUser = await User.findOne(
            {$or : [{email: authData.email},{phone: authData.phone}]}
        )

        if(!existUser)
        {

            return next(new AppError('User not found',400))

        }

        const isPwdMatch = await bcrypt.compare(authData.password,existUser.password)

        if(!isPwdMatch)
        {

            return next(new AppError('Incorrect password',400))

        }

        const token = jwtToken.signToken(existUser)

        res.status(200).json({
            status: 'success',
            token
        })

    }catch(e)
    {
        next(e)
    }

}   


// Jwt token filter

const tokenFilter = async(req,res,next)=>{

    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token)
    {
        return next(new AppError('You are not logged in',400))
    }
    req.user = await jwtToken.verifyToken(token)
    next()
}

const restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new AppError('You dont have permission to access this',403))
        }
        next();

    }
}


module.exports = {signUp,login,tokenFilter,restrictTo}