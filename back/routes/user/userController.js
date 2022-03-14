const pool = require('../../db').pool

exports.join = async (req,res) => {
    console.log(req.body)
    const {userid,userpw,username,nickname,birth,gender,phone} = req.body
    const sql = `INSERT INTO user(
                    userid,
                    userpw,
                    username,
                    nickname,
                    birth,
                    gender,
                    phone
                ) values(
                    ?,?,?,?,now(),?,?
                )`
    const prepare = [userid,userpw,username,nickname,birth,gender,phone]

    try {
        const [result] = await pool.execute(sql,prepare) //pool??

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
        const [result] = await pool.execute(sql,prepare)
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