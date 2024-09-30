const {User} = require('../models/User')
const QueryHelper = require('../utils/QueryHelper')


// Get all users - GET / 

const getAllUsers = async(req,res,next)=>{

    const queryBuilder = new QueryHelper(User.find(),req.query).execute() 

    const users = await queryBuilder.query 

    res.status(200).json({
        data : users,
        status: 'success',
    })
}



module.exports = {getAllUsers}