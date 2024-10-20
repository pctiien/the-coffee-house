const categoryController = require('../controllers/categoryController')
const express = require('express')
const router = express.Router()

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const authController = require('../controllers/authController')
router.route('/').get(categoryController.getAllCategories)
router.route('/').post(authController.tokenFilter,authController.restrictTo('admin'),upload.single("categoryImage"),categoryController.addNewCategory)
router.route('/:id').delete(authController.tokenFilter,authController.restrictTo('admin'),categoryController.deleteCategory)

module.exports = router