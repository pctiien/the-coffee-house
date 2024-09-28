const dotenv = require('dotenv')
const mongoose = require('mongoose')
const {addSizeSamples} = require('./models/Size')
const {addCategorySamples} = require('./models/Category')
const {addToppingSamples} = require('./models/Topping')

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE.replace('<db_password>',process.env.DATABASE_PASSWORD)

const connectDB = async()=>{
    try {

        await mongoose.connect(DB)
        .then(()=>console.log('Connected to database successfully'))

        // await addSizeSamples()
        // await addCategorySamples()
        // await addToppingSamples()


    }catch(err){
        console.error('MongoDB connection failed :',err.message)
    }
}
connectDB()

