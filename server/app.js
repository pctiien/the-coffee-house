const express = require('express')
const app = express()
const cors = require('cors');

const userRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const authRouter = require('./routers/authRouter')

const appErrorHandler = require('./utils/appErrorHandler')

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
)

app.use(express.json())


app.use('/auth',authRouter)
app.use('/products',productRouter)
app.use('/users',userRouter)

app.use(appErrorHandler)

module.exports = app
