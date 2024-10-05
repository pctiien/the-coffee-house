const orderController = require('../controllers/orderController')
const express = require('express')
const router = express.Router()

router.route('/').post(orderController.createOrder)
router.route('/').get(orderController.getAllOrders)

module.exports = router