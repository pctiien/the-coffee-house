const User = require('../models/User')
const QueryHelper = require('../utils/QueryHelper')


// Get all users - GET / 

const getAllUsers = async(req,res,next)=>{

    try{
        const queryHelper = new QueryHelper(User.find(),req.query).executeQuery()

        const users = await queryHelper.query
        const total = await User.countDocuments()

        res.status(200).json({
            status: 'success',
            result : {
                users,
                total
            }
        })
    }catch(e)
    {
        next(e)
    }
}



module.exports = {getAllUsers}