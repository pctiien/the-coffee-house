const categoryController = require('../controllers/categoryController')
const express = require('express')

const router = express.Router()

router.route('/').get(categoryController.getAllCategories)
router.route('/').post(categoryController.addNewCategory)

module.exports = router