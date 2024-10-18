const express = require('express')

const router = express.Router()

const productController = require('../controllers/productController')

const authController = require('../controllers/authController')

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/').get(productController.getAllProducts)

router.route('/').post(authController.tokenFilter,authController.restrictTo('admin'),upload.single("productImage"),productController.createProduct)

router.route('/:id').patch(authController.tokenFilter,authController.restrictTo('admin'),upload.single("productImage"),productController.updateProduct)

router.route('/:id').delete(authController.tokenFilter,authController.restrictTo('admin'),productController.deleteProduct)

module.exports = router