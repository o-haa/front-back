const express = require('express')
const userController = require('./userController')
const router = express.Router()

router.get('/join',userController.join)
router.get('/login',userController.login)

module.exports = router