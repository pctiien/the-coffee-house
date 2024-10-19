const {Topping} = require('../models/Topping')
const QueryHelper = require('../utils/QueryHelper')
const mongoose = require('mongoose')
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

const getToppingsByIds = async (req,res,next)=>{
    try{
        const ids = req.query._id

        if (!ids) {
            return res.status(400).json({
                status: 'fail',
                message: 'Missing topping ids'
            });
        }

        const toppingIds = ids.split(',').map(id => id.trim())

        for (const  id of toppingIds) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: 'fail',
                    message: `Invalid ObjectId format: ${id}`
                });
            }
        }
        const toppings = await Topping.find({
            _id: { $in: toppingIds } 
        });

        res.status(200).json({
            result: {
                toppings
            },
            status: 'success'
        })

    }catch(err){
        next(err)
    }
}


module.exports = {getAllToppings,getToppingsByIds}