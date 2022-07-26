import express from 'express'; 

import user from './controllers/useController.js'; 
import gender from './controllers/genderController.js';
import login from './controllers/loginController.js'

const router = express.Router();

//redirecionamentos de dados
router.use('/user', user); //USE - verbo http genérico que serve para várias requisições para usuários 
router.use('/gender', gender)
router.use('/login', login)

export default router;