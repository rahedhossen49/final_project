const jwt = require("jsonwebtoken")

exports.EncodeToken=(email, user_id)=>{
    let KEY = '1234568'
    let expire = {expiresIn: '24h'}
    let payload ={
        email: email,
        user_id: user_id
    }
    return jwt.sign(payload, KEY, expire )
}
exports.DecodeToken=(token)=>{
    try {
        let KEY = '1234568'
        return jwt.verify(token, KEY)
    } catch (error) {
        return null
    }
    
}