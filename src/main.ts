import * as express from 'express'
import 'dotenv/config'
const puerto = process.env.PORT || 3001;
 const app = express();

 app.get('/', (req,res) =>{
    res.send("Hola mundo")
 })

 app.listen(puerto, () =>{
    console.log("Escuchando en el puerto:"+ puerto)
 })