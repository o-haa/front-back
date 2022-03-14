const pool = require('../../db').pool
const {createToken} = require('../../utils/jwt')

exports.join = async (req,res) => {
    console.log(req.body)
    const {userid,userpw,username,nickname,birth,gender,phone} = req.body
    const sql = `INSERT INTO user(userid,userpw,username,nickname,birth,gender,phone) values(?,?,?,?,now(),?,?)`
    const prepare = [userid,userpw,username,nickname,birth,gender,phone]

    try {
        const [result] = await pool.query(sql,prepare) //pool??

        const response={
            result:{
                row:result.affectedRows,//row?
                id:result.insertId,
            },
            errno:0,
        }

        res.setHeader('Set-Cookie','name=oha; path=/; Domain=localhost;')
        res.json(response)
    }catch(e){
        console.log(e.message)
        const [result] = await pool.query(sql,prepare)
        const response = {
            result:{
                row:result.affectedRows,
                id:0,
            },
            
            errno:1
        }
        console.log(response),
        res.json(response)
    }
}

exports.login = async (req,res)=>{
    const {userid,userpw}=req.body
    const sql = 'SELECT userid,userpw FROM user WHERE userid=? and userpw=?'
    const prepare = [userid,userpw]

    try {
        const [result] = await pool.execute(sql,prepare)

        if (result.legth <= 0) throw new Error('Error')

        const jwt = createToken (result[0])
        console.log(jwt)

        res.setHeader('Set-Cookie',`token=${jwt}; path=/; httpOnly=true; Domain=localhost;` )
        console.log(req.headers.cookie)
        const response = {
            result,
            errno:0,
        }
        res.json(response)
    } catch(e){
        const response = {
            result:[],
            errno:1
        }
        res.json(response)
    }
}
