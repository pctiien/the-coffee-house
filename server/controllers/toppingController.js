const {Topping} = require('../models/Topping')
const QueryHelper = require('../utils/QueryHelper')
const getAllToppings = async(req,res,next)=>{
    try{
        
        const queryBuilder = new QueryHelper(Topping.find(),req.query).executeQuery()

        const toppings = await queryBuilder.query 

        res.status(200).json({
            result:{
                toppings
            },
            status: 'success'
        })

    }catch(err)
    {
        next(err)
    }
}

module.exports = {getAllToppings}