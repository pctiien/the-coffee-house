const orderController = require('../controllers/orderController')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/').post(orderController.createOrder)
router.route('/').get(authController.tokenFilter,authController.restrictTo('admin'),orderController.getAllOrders)

module.exports = router