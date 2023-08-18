const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const loginrequired = async(req, res, next)=>{
    const token = req.cookies['access-token']
    if(token){
        const validatoken = await jwt.verify(token, "apple")
        if(validatoken){
            res.user = validatoken.id
            next()
        }
        else{
            console.log('token expires')
            // res.redirect('')
        }

    }
    else{
        console.log('token not found')
        // res.redirect('')
    }
}

module.exports = { loginrequired }