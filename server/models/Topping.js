const mongoose = require('mongoose') 

const toppingSchema = new mongoose.Schema({
    
    name : {
        type: String
    },
    priceAddition : {
        type : Number
    },
    

})

const Topping = mongoose.model('Topping',toppingSchema)

const addToppingSamples = async()=>{
    await Topping.insertMany([
        {
            name : 'Cream Chesse Macchiato',
            priceAddition : 10000
        },
        {
            name : 'Fig tree',
            priceAddition : 10000
        },
        {
            name : 'Lotus Seeds',
            priceAddition : 10000
        },
        {
            name : 'Peach Pieces',
            priceAddition : 10000
        },
        {
            name : 'White pearl',
            priceAddition : 10000
        },
        {
            name : 'Coffee Jelly',
            priceAddition : 10000
        },
        {
            name : 'Caramel Sauce',
            priceAddition : 10000
        },
        {
            name : 'Shot Espresso',
            priceAddition : 10000
        },
    ])
}

module.exports = {Topping,addToppingSamples}