import z from "zod"
import { EnumGendaer, Enumprovaid, EnumRole } from "./user.type.js"



export const validationuser ={
    body: z.strictObject({
    firstname:z.string(),
    Lastname:z.string(),
    phone:z.string(),
    username:z.string(),
    role:z.enum(EnumRole),
    Gander:z.enum(EnumGendaer),
    passwerd:z.string(),
    provaid:z.enum(Enumprovaid),
    email:z.email(),
    age:z.number()
}),
query:z.strictObject({
    id:z.string()
})
}