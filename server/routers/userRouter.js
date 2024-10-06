const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
router.route('/').get(authController.tokenFilter,authController.restrictTo('admin'),userController.getAllUsers)

module.exports = router