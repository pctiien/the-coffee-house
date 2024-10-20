const Voucher = require('../models/Voucher')
const AppError = require('../utils/appError')
const QueryHelper = require('../utils/QueryHelper')
const s3 = require('../utils/s3')

//Get all vouchers - GET method .../
const getAllVouchers = async (req,res,next)=>{
    try{
        const queryHelper = new QueryHelper(Voucher.find(),req.query).executeQuery()

        const vouchers = await queryHelper.query
        const total = await Voucher.countDocuments()

        res.status(200).json({
            status: 'success',
            result : {
                vouchers,
                total
            }
        })
    }catch(e)
    {
        next(e)
    }
}
//Create a voucher - POST method .../
const createVoucher = async(req,res,next)=>{
    
    try{
        const file = req.file
        
        if(!file) return next(new AppError("Voucher image is missing",400))
            
        const imgUrl = await s3.uploadImg('voucher',file)
        if(!imgUrl)
        {
            return next(new AppError("Error when uploading voucher image"))
        }

        const voucher = await Voucher.create(
            {
                ...req.body,
                imageUrl: imgUrl
            }
        )
        res.status(201).json({
            status: 'success',
            data : voucher 
        })

    }catch(err)
    {
        next(err)
    }

}

// Delete a voucher - DELETE method .../:id
const deleteVoucher = async(req,res,next)=>{

    const voucher = await Voucher.findByIdAndDelete(req.params.id)
    if(voucher.imageUrl)
    {
        try {
            await s3.deleteImg(voucher.imageUrl)
        } catch (error) {
            return next(new AppError('Error deleting image'))
        }
    }

    if(!voucher)
    {
        res.status(400).json({
            status: 'fail',
            message: 'Voucher not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Voucher deleted successfully'
    })
}

module.exports = {getAllVouchers,deleteVoucher,createVoucher}