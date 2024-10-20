const toppingController = require('../controllers/toppingController')
const express= require('express')

const router = express.Router()

router.route('/').get(toppingController.getAllToppings)
router.route('/').post(toppingController.addNewTopping)
router.route('/:id').delete(toppingController.deleteTopping)

router.route('/filter').get(toppingController.getToppingsByIds)
module.exports = router