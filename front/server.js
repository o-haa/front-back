const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const router = require('./routes')

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true,
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.use(router)


app.listen(3001,()=>{
    console.log('front server start')
})