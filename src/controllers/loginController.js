import Express, { request, response }  from "express";
import { body, validationResult} from 'express-validator';
import db from '../services/userService.js'

const router = Express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Informe um email válido, por favor'),
    body('password').isStrongPassword({minLength: 8, minNumbers: 1, minUppercase: 1, 
    minSymbols:1}).withMessage("A senha precisa ter ao menos 8 caracteres. 1 numeros, e 1 letra maiuscula "),
    

] , async (request, response) =>{

    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(401).json({message: errors.array()});
    }

    const{email, password} = request.body;

    try{
        const results = await db.insertUser(email,password);
        if(results.length == 0){
        response.status(401).json ({message:'Login ou senha invalidos'})
    } else {
        response.status(200).json ({message:'Login efetuado com sucesso'})
    }
    }catch(error){
        response.status(500).json({message:`Erro encontrado: ${error}`});
    }
})



export default router;
