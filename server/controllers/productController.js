const {Product} = require('../models/Product')
const QueryHelper = require('../utils/QueryHelper')

//Get all products - GET method .../
const getAllProducts = async (req,res,next)=>{
    
    const queryHelper = new QueryHelper(Product.find(),req.query).executeQuery()
    
    const products = await queryHelper.query

    res.status(200).json({
        status: 'success',
        data : {
            products
        }
    })
}

//Create a product - POST method .../
const createProduct = async(req,res,next)=>{
    
    const product = await Product.create(req.body)
    res.status(201).json({
        status: 'success',
        data : product 
    })

}

// Update product - PATCH .../productId

const updateProduct = async(req,res,next)=>{

    const updateInfo = req.body 

    const product = await Product.findByIdAndUpdate(req.params.id,{
        price : updateInfo.price,
        name : updateInfo.name,
        categoryId : updateInfo.categoryId

    },{
        new: true
    })

    if(!product) res.status(400).json({
        status: 'fail',
        message: 'Product not found'
    })

    if(updateInfo.toppingIds && updateInfo.toppingIds.length >0)
    {
        product.toppingIds.push(...toppingIds)
        await product.save()
    }

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