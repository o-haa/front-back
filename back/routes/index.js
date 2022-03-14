const express = require('express')
const router = express.Router()
const userRouter = require('./user/index')

// const boardRouter = require('./board/index')

router.use('/api/user',userRouter)
// router.use('/api/board')

module.exports = router
