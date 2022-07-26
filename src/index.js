import express from "express";
import routes from "./routes.js";
import cors from 'cors';
const api = express();

api.use(cors()); //serve para dizer se o back-end vai ser publico, travado ou quais sites podem utilizar
api.use(express.json()); //o comando .json faz com que o express leia arquivos json. 

api.use('/', routes);

api.listen('3333', () => {
    console.log('Server is running...')
})
