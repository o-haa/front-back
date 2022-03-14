const express = require('express')
const router = express.Router()
const userRouter = require('./user/index')
// const boardRouter = require('./board/index')

router.use('/user',userRouter)
// router.use('/board')



module.exports = router