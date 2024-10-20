const {Topping} = require('../models/Topping')
const QueryHelper = require('../utils/QueryHelper')
const mongoose = require('mongoose')
const AppError = require('../utils/appError')
const getAllToppings = async(req,res,next)=>{
    try{
        
        const queryBuilder = new QueryHelper(Topping.find(),req.query).executeQuery()

        const toppings = await queryBuilder.query 
        const total = await Topping.countDocuments()

        res.status(200).json({
            result:{
                toppings,
                total
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
const addNewTopping = async(req,res,next)=>{
    try{

        const toppingData = req.body
    
        if(!toppingData){
            return next(new AppError('Topping data is missing',400))
        }
        const topping = await Topping.create(toppingData)
        res.status(201).json({
            status: 'success',
            data : topping 
        })

    }catch(err)
    {
        next(err)
    }
}
const deleteTopping = async(req,res,next)=>{

    const topping = await Topping.findByIdAndDelete(req.params.id)

    if(!topping)
    {
        res.status(400).json({
            status: 'fail',
            message: 'Topping not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Topping deleted successfully'
    })
}
module.exports = {getAllToppings,getToppingsByIds,addNewTopping,deleteTopping}