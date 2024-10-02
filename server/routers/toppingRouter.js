const toppingController = require('../controllers/toppingController')
const express= require('express')

const router = express.Router()

router.route('/').get(toppingController.getAllToppings)

module.exports = router