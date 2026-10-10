import { Router } from "express";
import * as serves from "./user.serves.js";
import { SuccesRess } from "../../utils/SsuccessMassage.js";
import { auth ,authonticate} from "../../middleware/auth.js";
import { EnumRole } from "./user.type.js";
import { validationuser } from "./user.validation.js";
import { errorRes } from "../../utils/errormassege.js";
import {validation} from "../../middleware/validation.js"
export const router = Router()

export const routes = {
    base:"/user",
    SighnUps:"/SighnUps", //post
    login:"/login", //post
    prfile:"/prfile", //get
    refresh:"/refreshtoken",//post
}




router.post(routes.SighnUps,validation(validationuser),async(req,res)=>{
   
let {firstname,LastName,age,username,email,Gander,provaid,role,passwerd}= req.body
let {data} = await serves.SighnUp(firstname,LastName,age,username,email,Gander,provaid,role,passwerd)

SuccesRess({res,msg:"done",status:201,data})
})


router.post(routes.login,async(req,res)=>{
    let {midfay,passwerd} = req.body
    let {data} = await serves.login(midfay,passwerd)
    SuccesRess({res,msg:"done",data,status:200})
})

router.get(routes.prfile,auth,authonticate(EnumRole.admin),async(req,res)=>{
    let {user} = req.user

    SuccesRess({res,data:{user},msg:"done",status:200})
})

router.post(routes.refresh,async(req,res)=>{
    let {authorization} =req.headers
    let {data} = await serves.refresh(authorization)

    SuccesRess({res,data,msg:"data done",status:200})
})


