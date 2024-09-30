const mongoose = require('mongoose') 

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    img:{
        type: String,
        default: null
    }

})

const Category = mongoose.model('Category',categorySchema)

const addCategorySamples = async ()=>{
    await Category.insertMany([
        {
            img: "https://minio.thecoffeehouse.com/image/admin/1725005567_mon-moi-phai-thu.png",
            name: "New Must Try Dishes"
        },
        {
            name : 'Fruit Blend 0°C',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005687_trai-cay-xay.png",

        },
        {
            name : 'Fruit Tea - HiTea',
            img: 'https://minio.thecoffeehouse.com/image/admin/1725005673_tra-trai-cay.png'

        },
        {
            name : 'Milk tea',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005587_tra-sua.png",

        },
        {
            name : 'Green Tea - Chocalate',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005680_tra-xanh.png",

        },
        {
            name : 'Frosty Blended Ice',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005559_frosty.png",

        },
        {
            name : 'Coffee',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005487_ca-phe.png",
        },
        {
            name : 'Homemade Rice',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005493_com-nha.png",
        },
        {
            name : 'Salty Cake',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005473_banh-man.png",

        },
        {
            name : 'Hot Dish',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005575_mon-nong.png",

        },
        {
            name : 'Cake',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005480_banh-ngot.png",

        },
        {
            name : 'Topping',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005581_topping.png",
        },
        {
            name : 'Packaged Coffee - Tea',
            img: "https://minio.thecoffeehouse.com/image/admin/1725005501_cpg.png",
        },
        {
            name: 'Signature CPG Coffee',
            img : "https://minio.thecoffeehouse.com/image/admin/1675690611_8-signature-cpg-coffee.png",

        }
    ])
}
module.exports = {Category,addCategorySamples}