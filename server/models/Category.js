const mongoose = require('mongoose') 

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }

})

const Category = mongoose.model('Category',categorySchema)

const addCategorySamples = async ()=>{
    await Category.insertMany([
        {
            name : 'Fruit Blend 0°C'
        },
        {
            name : 'Fruit Tea - HiTea'
        },
        {
            name : 'Milk tea'
        },
        {
            name : 'Green Tea - Chocalate'
        },
        {
            name : 'Frosty Blended Ice'
        },
        {
            name : 'Coffee'
        },
        {
            name : 'Homemade Rice'
        },
        {
            name : 'Salty Cake'
        },
        {
            name : 'Hot Dish'
        },
        {
            name : 'Cake'
        },
        {
            name : 'Topping'
        },
        {
            name : 'Packaged Coffee - Tea'
        }
    ])
}
module.exports = {Category,addCategorySamples}