const express = require('express')
const app = express()
const cors = require('cors');

const userRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const authRouter = require('./routers/authRouter')
const categoryRouter = require('./routers/categoryRouter')
const toppingRouter = require('./routers/toppingRouter')
const sizeRouter = require('./routers/sizeRouter')
const orderRouter = require('./routers/orderRouter')
const voucherRouter = require('./routers/voucherRouter')
const orderItemRouter = require('./routers/orderItemRouter')
const appErrorHandler = require('./utils/appErrorHandler')

app.use(
    cors({
        origin: ['http://localhost:3000','http://localhost:5173','http://localhost:5174'],
        credentials: true,
    })
)

app.use(express.json())

app.use('/toppings',toppingRouter)
app.use('/auth',authRouter)
app.use('/products',productRouter)
app.use('/users',userRouter)
app.use('/categories',categoryRouter)
app.use('/sizes',sizeRouter)
app.use('/orders',orderRouter)
app.use('/orderitems',orderItemRouter)

app.use('/vouchers',voucherRouter)

app.use(appErrorHandler)

module.exports = app
