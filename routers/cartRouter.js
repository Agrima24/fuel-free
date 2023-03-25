const express = require('express')
const router = express.Router()
const cart = require('../controllers/cartController')

router.post('/createCart',cart.addCart)

module.exports = router