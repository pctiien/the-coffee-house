const appErrorHandler = (err,req,res,next)=>{
    res.status(err.status || 500)
        .json({
            status: 'fail',
            message: err.message || 'Internal Server Error'
    })
}

module.exports = appErrorHandler