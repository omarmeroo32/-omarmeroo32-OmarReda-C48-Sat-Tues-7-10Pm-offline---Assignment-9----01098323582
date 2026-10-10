import { safeParse } from "zod"
import { errorRes } from "../utils/errormassege.js"

 

export const validation = (Schema)=>{
 
     return (req,res,next)=>{
        const validationError = []
        Object.keys(Schema).map(ele=>{
            const validationRes =Schema[ele].safeParse(req[ele])
            if(!validationRes.success){
                validationError.push({
                    [ele]:validationRes.error.issues   
                })
            }
            if(validationError.length){
                errorRes({msg:"the Error validation!", statusCode:400,options:validationError})
            }
        })
        next()
     }
 }