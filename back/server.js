const express = require('express')
const cors = require('cors')
const app = express()

const router = require('./routes')

app.use(express.json()) //request body를 가지고 올 수 있다. 위키백과사전 참고
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:true, //??
    credentials:true //?? 아마도 쿠키전송
}))

app.get('/',(req,res)=>{
    console.log(req.body)
    res.setHeader('Set-Cookie', 'name=oha; Domain=localhost;')
    res.send('back')
})

app.use(router)

app.listen(4001,()=>{
    console.log('back server start')
})