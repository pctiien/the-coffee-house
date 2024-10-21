const orderController = require('../controllers/orderController')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/').post(orderController.createOrder)
router.route('/').get(orderController.getAllOrders)
router.route('/:id').get(orderController.getOrderById)
router.route('/:id').patch(authController.tokenFilter,authController.restrictTo('admin'),orderController.updateOrder)

module.exports = router