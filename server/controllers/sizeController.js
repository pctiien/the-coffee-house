const {Size} = require('../models/Size')
const QueryHelper = require('../utils/QueryHelper')

const getAllSizes = async(req,res,next)=>{

    try{
        const queryBuilder = new QueryHelper(Size.find(),req.query).executeQuery()
        const sizes = await queryBuilder.query
        res.status(200).json({
            result: {
                sizes,
            },
            status: 'success'
        })
    }catch(err){
        next(err)
    }
}

module.exports = {getAllSizes}