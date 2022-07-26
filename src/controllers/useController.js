import Express, { request, response }  from "express";
import { body, validationResult} from 'express-validator';
import db from '../services/userService.js'

const router = Express.Router();

//request é o que o front envia para o back 
//response é a resposta que o back envia para o front
router.post('/', [
    body('email').isEmail().withMessage('Informe um email válido, por favor'),
    body('password').isStrongPassword({minLength: 8, minNumbers: 1, minUppercase: 1, 
    minSymbols:1}).withMessage("A senha precisa ter ao menos 8 caracteres. 1 numeros, 1 letra maiuscula e 1 simbolo (/, -, _, $, @)"),
    

] ,async (request, response)=>{


    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).json({message: errors.array()});
    }

    // const email = request.body.email;
    // const password = request.body.password;
    // const userName = request.body.userName;

    const{email, password, userName} = request.body;

    try{
        await db.insertUser(email,password,userName);

        response.status(201).json ({message:'Usuario cadastrado com sucesso'})
    }catch(error){
        response.status(500).json({message:`Erro encontrado: ${error}`});
    }

});

router.get('/', async (request, response) =>{
    try {
    const results = await db.findUser(); 
    if(results.length == 0){ //2 pontos de interrogação serve para verificar o tipo de dado(V ou F)
        response.status(204).json(results)
    } else {
        response.status(200).json(results)
    }
    
    }catch(err) {
        response.status(500).json({message:`Erro encontrado: ${error}`});
}
})  


export default router;