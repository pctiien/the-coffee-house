const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema({
    name : {
        type: String,
        enum: ['Small', 'Fit', 'Big'],
        required: true
    },
    priceAddition:{
        type: Number,
        required: true,
    }
})
const Size = mongoose.model('Size',sizeSchema)

const addSizeSamples = async () => {
    await Size.insertMany([
        {
            name: 'Small',
            priceAddition: 0
        },
        {
            name: 'Fit',
            priceAddition: 6000
        },
        {
            name: 'Big',
            priceAddition: 10000
        },
    ])
}

module.exports = {Size,addSizeSamples}