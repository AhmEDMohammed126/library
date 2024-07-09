import express from "express"
import { dbConnection } from "./DB/db.connection.js";
import authorRouter from "./src/modules/author/author.routes.js";
import bookRouter from "./src/modules/book/book.routes.js";
dbConnection
const app=express();
const port=3000;
app.use(express.json())
app.use('/author',authorRouter)
app.use('/book',bookRouter)

app.listen(port,()=>{
    console.log("runnig in port..........",port);
})