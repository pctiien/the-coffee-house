const express = require('express')
const router = express.Router()
const voucherController = require('../controllers/voucherController')
const authController = require('../controllers/authController')

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


router.route('/').get(voucherController.getAllVouchers)
router.route('/:id').delete(authController.tokenFilter,authController.restrictTo('admin'),voucherController.deleteVoucher)
router.route('/').post(authController.tokenFilter,authController.restrictTo('admin'),upload.single("voucherImage"),voucherController.createVoucher)

module.exports =  router