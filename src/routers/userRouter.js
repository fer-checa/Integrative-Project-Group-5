const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const validarDatos = [
    body('name').notEmpty().withMessage('Debes Completar el Nombre').bail(),
    body('email').notEmpty().withMessage('Debes Completar el email').bail().isEmail().withMessage('Debes completar un email valido'),
    body('password').notEmpty().withMessage('Debes Completar la contraseña').bail().isLength({min: 8}).withMessage('La constraseña debe tener como minimo 8 caracteres'),
    body('rePassword').notEmpty().withMessage('Debes Completar Repetir la contraseña').bail().isLength({min: 8}).withMessage('La constraseña debe tener como minimo 8 caracteres')
]

const userController = require('../controllers/userControllers');

router.get('/login',userController.login);

router.get('/register',userController.register);
router.post('/register', validarDatos ,userController.create);

router.get('/list', userController.list);
router.get('/edit/:id', userController.edit); 
router.patch('/edit/:id', userController.update); 

router.delete('/delete/:id', userController.destroy);
 
router.get('/admin',userController.admin); 


module.exports = router;