import {model, Schema } from "mongoose";
import{EnumRole,Enumprovaid,EnumGendaer} from "../../model/user.model/user.type.js"
import { string } from "zod";

const userSchema = new Schema({
    firstname:{
        type:String,
        require:true
    },
    LastName:{
        type:String,
        require:true
    },
    age:Number,
    boi:String,
    username:{
        type:String,
        unique:true,
        require:true
    },email:{
        unique:true,
        require:true,
        type:String
    },
    Gander:{
        type:Number,
        require:true,
        enum:Object.values(EnumGendaer),
        default:EnumGendaer.male
    },
    provaid:{
        type:Number,
        require:true,
        enum:Object.values(Enumprovaid),
        default: Enumprovaid.system
    },phone:{
         type:String
    },
    role:{
        type:Number,
        require:true,
        enum:Object.values(EnumRole),
        default:EnumRole.user
    },confiarmAt:{
        type:Date
    },
    blocedAt:Date,
    passwerd:{
        type:String
    }

},{
    strict:true,
    strictQuery:true,
    timestamps:true,
    optimisticConcurrency:true,
    toJSON:{
        virtuals:true,
        getters:true
    },
    toObject:{
        virtuals:true,
        getters:true
    }
})




export const usermodel = model("User",userSchema)
