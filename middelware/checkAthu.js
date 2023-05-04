const jwt = require('jsonwebtoken');
const db = require('../config/db');
const secret = '8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaPdRgUk'

const chekathu = async(req,res,next)=>{
    const {authorization}= req.headers
    if(!authorization || !authorization.startsWith('Bearer ')){
        return res.status(401).json({succss:false, msg:"You are not authorization"})
    }
    const token = authorization.split(' ')[1];
    try {
        let istoken = await db.user_sessions.findOne({
            where:{token}
        });

        istoken= istoken.toJSON()

        if(!istoken){
            return res.status(401).json({success:false,msg:"Unauthorized"})
        }
        const decode = jwt.verify(token, secret)
        req.user={
            id:decode.id,
            email:decode.email
        }
       return next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: "Token invalid" })
    }
}
module.exports= chekathu