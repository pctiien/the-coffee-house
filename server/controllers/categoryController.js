const {Category} = require('../models/Category')
const QueryHelper = require('../utils/QueryHelper')
const s3 = require('../utils/s3')

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
        const file = req.file
        
        if(!file) return next(new AppError("Category image is missing",400))
            
        const imgUrl = await s3.uploadImg('category',file)
        if(!imgUrl)
        {
            return next(new AppError("Error when uploading category image"))
        }

        const category = await Category.create(
            {
                ...req.body,
                img: imgUrl
            }
        )
        res.status(201).json({
            status: 'success',
            data : category 
        })

    }catch(err)
    {
        next(err)
    }
}
const deleteCategory = async(req,res,next)=>{

    const category = await Category.findByIdAndDelete(req.params.id)
    if(category.img)
    {
        try {
            await deleteImg(category.img)
        } catch (error) {
            return next(new AppError('Error deleting image'))
        }
    }

    if(!category)
    {
        res.status(400).json({
            status: 'fail',
            message: 'Product not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully'
    })
}
module.exports = {getAllCategories,addNewCategory,deleteCategory}