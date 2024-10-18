const Product = require('../models/Product')
const QueryHelper = require('../utils/QueryHelper')
const {uploadImg} = require('../utils/s3')
const AppError = require('../utils/appError')

//Get all products - GET method .../
const getAllProducts = async (req,res,next)=>{
    try{
        const queryHelper = new QueryHelper(Product.find(),req.query).executeQuery()

        const products = await queryHelper.query
        const total = await Product.countDocuments()

        res.status(200).json({
            status: 'success',
            result : {
                products,
                total
            }
        })
    }catch(e)
    {
        next(e)
    }
}




//Create a product - POST method .../
const createProduct = async(req,res,next)=>{
    
    try{
        const file = req.file
        
        if(!file) return next(new AppError("Product image is missing",400))
            
        const imgUrl = await uploadImg('product',file)
        if(!imgUrl)
        {
            return next(new AppError("Error when uploading product image"))
        }

        const product = await Product.create(
            {
                ...req.body,
                imageUrl: imgUrl
            }
        )
        res.status(201).json({
            status: 'success',
            data : product 
        })

    }catch(err)
    {
        next(err)
    }

}

// Update product - PATCH .../productId

const updateProduct = async(req,res,next)=>{
    const file = req.file
    let imgUrl = ''

    if(file){
        imgUrl = await uploadImg('product',file)
        if(!imgUrl)
        {
            return next(new AppError("Error when uploading product image"))
        }
    }
            
    const updateInfo = req.body 

    const updateFields = {
        price: updateInfo.price,
        name: updateInfo.name,
        categoryId: updateInfo.categoryId,
        toppingIds: updateInfo.toppingIds,
        description: updateInfo.description,
    };

    if (imgUrl) {
        updateFields.imageUrl = imgUrl;
    }

    const product = await Product.findByIdAndUpdate(req.params.id,updateFields,{
        new: true,
        runValidators: true
    })

    if(!product) res.status(400).json({
        status: 'fail',
        message: 'Product not found'
    })

    res.status(200).json({
        status: 'success',
        message: 'Product updated successfully'
    })
        
}



// Delete a product - DELETE method .../:id
const deleteProduct = async(req,res,next)=>{

    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product)
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



module.exports = {getAllProducts,createProduct,updateProduct,deleteProduct}