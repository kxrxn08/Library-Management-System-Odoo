const jwtToken=require('jsonwebtoken')
const secret="odoo"

module.exports.generateToken=(user)=>{ 
    return jwtToken.sign(user,secret,{expiresIn:'30d'});
}

module.exports.validateToken=(token)=>{
    try{
        return jwtToken.verify(token,secret)
    }
    catch(error)
    {
        // //console.log(1);
        // //console.log(error)
        return null
    }
}

module.exports.generateTokenForForgot=(user)=>{ 
    return jwtToken.sign(user,secret,{expiresIn:'1h'});
}