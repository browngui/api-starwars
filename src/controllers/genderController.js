import Express, { response }  from "express";
import { body, validationResult} from 'express-validator';
import db from '../services/genderService.js'

const router = Express.Router();

router.post('/', [
    body('genero').isString().withMessage('Informe um genero valido, por favor.')
    

] ,async (request, response)=>{


    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).json({message: errors.array()});
    }


    const{genero} = request.body;

    try{
        await db.insertGender(genero);

        response.status(201).json ({message:'genero cadastrado com sucesso'})
    }catch(error){
        response.status(500).json({message:`Erro encontrado: ${error}`});
    }

});

router.get('/', async (request, response) => {
    try {
        const results = await db.findGender();
        if(results.length == 0){
            response.status(204).json(results)
    } else {
        response.status(200).json(results)
    }

    }catch(err) {
        response.status(500).json({message:`Erro encontrado: ${error}`});
    }
})

export default router;