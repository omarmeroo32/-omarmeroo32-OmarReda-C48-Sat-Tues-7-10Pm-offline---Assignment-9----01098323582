import { usermodel } from "../DB/model/user.js"
import { errorRes } from "../utils/errormassege.js"

import jwt from "jsonwebtoken"

export const EnumToken = {
    access:"access",
    refresh:"refresh"
}

export const auth = async(req,res,next)=>{
    let {user} = await decoding({authorization:req.headers.authorization})
    req.user = user
    next()
}

export const decoding =async({authorization,tokentype= EnumToken.access})=>{
    if(!authorization){
        errorRes({msg:"In-valid Token"})
    }

    let token = authorization.split(" ")[1]
    let payload =jwt.verify(token,
        tokentype == EnumToken.access?
        process.env.ACCESSTOKEN:
        process.env.REFRESHTOKEN
    )

    let user = await usermodel.findOne({payload:payload._id})
    if(!user){
        errorRes({msg:"the user not found",statusCode:404})
    }
      
     return{
        user
     }
}


export const authonticate = (...roles)=>{
    return (req,res,next)=>{        
       if(!roles.includes(req.user.role)){
        errorRes({msg:"not varibloe!",statusCode:400})
       }

        next()
    }
}