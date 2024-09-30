const User = require('../models/User')
const bcrypt = require('bcrypt')

// Signup - POST / 

const signUp = async (req,res,next)=>{

    try{

        const userData = req.body 

        const existUser = await User.findOne({email: userData.email})
    
        if(existUser)
        {
            res.status(400).json({
                message:    'User already exists',
                status: 'fail'
            })
        }
    
        const saltRounds = 10 
        const hashedPwd = await bcrypt.hash(userData.password,saltRounds)
    
        userData.password = hashedPwd 
        
        const user = new User(userData)
    
        await user.save()
    
        res.status(201).json({
            status: 'success',
            data: user
        })

    }catch(e){
        next(e)
    }

}

// Login - POST 

const login = async ( req,res,next)=>{

    try{
        const authData = req.body 

        const existUser = await User.findOne({email: authData.email})

        if(!existUser)
        {
            res.status(400).json({
                status: 'fail',
                message : 'User not found'
            })
        }

        const isPwdMatch = await bcrypt.compare(authData.password,existUser.password)

        if(!isPwdMatch)
        {
            res.status(400).json({
                status: 'fail',
                message: 'Incorrect password'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Login successful'
        })
    }catch(e)
    {
        next(e)
    }

}   

module.exports = {signUp,login}