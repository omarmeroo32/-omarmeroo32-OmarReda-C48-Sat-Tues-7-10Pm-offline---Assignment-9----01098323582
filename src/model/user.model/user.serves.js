import jwt from "jsonwebtoken"
import {usermodel} from "../../DB/model/user.js"
import { errorRes } from "../../utils/errormassege.js"
import {decoding, EnumToken} from "../../middleware/auth.js"
import {hasingpassword,comparepasswrod} from "../../utils/security/hash.js"



export const SighnUp = async(firstname,LastName,age,username,email,Gander,provaid,role,passwerd)=>{

  let findusername= await usermodel.find({email})
  let findemail = await usermodel.find({username})

  if(findemail == email || findusername == username){
    errorRes({msg:`${findemail? "email": "username"} exist`})
  }


    const user = await usermodel.create({
        firstname,LastName,age,username,email,Gander,provaid,role,passwerd:await hasingpassword(passwerd)
    })

    return{
        data:{
            user
        }
    }
}



export const login =async(midfay,passwerd)=>{
 let user = await usermodel.findOne({
    $or:[
        {email:midfay},
        {username:midfay}
    ]
 })
 const isMatch = await comparepasswrod(passwerd,user.passwerd)
 if(!user){
    errorRes({msg:"the user not found!",statusCode:400})
 }
        if(!isMatch){
            errorRes({msg:"in-valid",statusCode:400})
        }
  let accesstoken = jwt.sign({
     _id: user._id,
     email:user.email
  },process.env.ACCESSTOKEN,{
    expiresIn:"2Minutes"
  })

  let refreshtoken = jwt.sign({
    _id:user._id,
    email:user.email
  },process.env.REFRESHTOKEN,{
    expiresIn: "30Minutes"
  })

  return{
    data:{
        accesstoken,
        refreshtoken
    }
  }
}




export const refresh = async(authorization)=>{
    let {user} = await decoding({authorization,tokentype:EnumToken.refresh})

    let accesstoken = jwt.sign({
      _id:user._id,
      email:user.email
    },process.env.ACCESSTOKEN,{
      expiresIn:"2Minutes"
    })
return{
  data:{
    accesstoken
  }
}

}