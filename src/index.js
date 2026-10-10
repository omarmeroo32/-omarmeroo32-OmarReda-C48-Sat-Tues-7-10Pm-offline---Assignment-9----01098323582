import chalk from "chalk"
import express from "express"
import config from "dotenv"
import {tryconnection} from "./DB/DB.connection.js"
import { fileURLToPath } from "node:url";
import {usermodel} from "./DB/model/user.js"
import { router,routes } from "./model/user.model/user.conttroller.js";
const app = express()
app.use(express.json())

app.use(routes.base,router)

let x = config.config({
    path: fileURLToPath(new URL("../.env", import.meta.url)),
})




export const index =async ()=>{

await tryconnection()




    app.listen(process.env.PORT,()=>{
        console.log(chalk.green("run in port 3000"))
    })

     app.use((err, req, res, next) => {

        let statusCode = err.cause?.statusCode || 500;

        res.status(statusCode).json({
            errorMsg: err.message,
            status: statusCode,
            errorOptions: err.cause?.options
    })});
}