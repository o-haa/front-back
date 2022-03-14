const express = require('express')
const userController = require('./userController')
const router = express.Router()

router.post('/join',userController.join)

module.exports = router
