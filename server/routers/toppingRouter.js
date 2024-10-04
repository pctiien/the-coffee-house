const toppingController = require('../controllers/toppingController')
const express= require('express')

const router = express.Router()

router.route('/').get(toppingController.getAllToppings)
router.route('/filter').get(toppingController.getToppingsByIds)
module.exports = router