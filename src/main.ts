import * as express from 'express'
import 'dotenv/config'
import {conectarDB} from './infraestructure/database/mongoose'
import router from './interfaces/routes/ProfileRoutes';
import * as cors from "cors"


 const puerto = process.env.PORT || 3001;
 const app = express();

 app.use(express.json());

// (opcional) si usas formularios con x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// (opcional) si estás usando CORS para permitir peticiones desde otros orígenes
app.use(cors());

 app.get('/', (req,res) =>{
    res.send("Hola mundo")
 })

 app.use("/api", router);

const iniciarServidor = async () => {
  await conectarDB();

  app.listen(puerto, () => {
    console.log(`Servidor corriendo en puerto ${puerto}`);
  });
};

iniciarServidor();