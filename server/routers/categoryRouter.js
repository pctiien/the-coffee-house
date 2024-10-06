const categoryController = require('../controllers/categoryController')
const express = require('express')

const router = express.Router()
const authController = require('../controllers/authController')
router.route('/').get(categoryController.getAllCategories)
router.route('/').post(authController.tokenFilter,authController.restrictTo('admin'),categoryController.addNewCategory)

module.exports = router