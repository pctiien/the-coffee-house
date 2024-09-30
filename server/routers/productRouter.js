const express = require('express')

const router = express.Router()

const productController = require('../controllers/productController')

router.route('/').get(productController.getAllProducts)

router.route('/').post(productController.createProduct)

router.route('/:id').patch(productController.updateProduct)

router.route('/:id').delete(productController.deleteProduct)

module.exports = router