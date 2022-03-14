require('dotenv').config()
const crypto = require('crypto')
const salt = process.env.SALT

function createToken(token){
    const header = {
        tpy:"JWT",
        alg:"HS256"
    }

    const payload = {
        ...token
    }

    const encodingHeader = encoding(header)
    const encodingPayload = encoding(payload)
    const signature = createSignature(encodingHeader,encodingPayload)

    return `${encodingHeader}.${encodingPayload}.${signature}`

}

function encoding(v){
    return Buffer.from(JSON.stringify(v))
                 .toString('base64')
                 .replace(/[=]/g,'')
}

function createSignature(header,payload){
    const encoding = `${header}.${payload}`
    const signature = crypto.createHmac('sha256',salt)
                            .update(encoding)
                            .digest('base64')
                            .replace(/[=]/g,'')
    return signature
}

module.exports = {
    createToken,
    createSignature
}