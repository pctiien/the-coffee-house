const orderItemController = require('../controllers/orderItemController')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/').get(orderItemController.getOrderItemsByOrder)


module.exports = router