const {Category} = require('../models/Category')
const QueryHelper = require('../utils/QueryHelper')


// GET .../
const getAllCategories = async(req,res,next)=>{
    try{
        const queryBuilder = new QueryHelper(Category.find(),req.query).executeQuery()

        const categories = await queryBuilder.query

        const total = await Category.countDocuments();

        res.status(200).json({
            result: {
                categories,
                total
            },
            status: 'success',
        })
        
    }catch(err){
        next(err)
    }
}

const addNewCategory = async (req,res,next)=>{
    try{

        const categoryData = req.body 
        const category = await Category.create(categoryData)
        res.status(201).json({
            data: {
                category
            },
            status: 'created'
        })    
        
    }catch(err)
    {
        next(err)
    }
}
module.exports = {getAllCategories,addNewCategory}