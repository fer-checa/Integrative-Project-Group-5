const express = require('express');
const router = express.Router();
const {body, check} = require('express-validator');
const path = require('path');
//
const multer = require('multer');

//multer

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/img/usersImage")
    },
    filename: function(req, file, cb){
        cb(null, "user-" + Date.now() + path.extname(file.originalname))
    },
    
})

const upload = multer({storage: storage});


const validarDatos = [
    body('name').notEmpty().withMessage('Debes Completar el Nombre').bail(),
    body('email').notEmpty().withMessage('Debes Completar el email').bail().isEmail().withMessage('Debes completar un email valido'),
    body('password').notEmpty().withMessage('Debes Completar la contraseña').bail().isLength({min: 8}).withMessage('La constraseña debe tener como minimo 8 caracteres'),
    body('rePassword').notEmpty().withMessage('Debes Completar Repetir la contraseña').bail().isLength({min: 8}).withMessage('La constraseña debe tener como minimo 8 caracteres')
]

const userController = require('../controllers/userControllers');
const { loginProcess } = require('../controllers/userControllers');

/* LOGIN */
router.get('/login',userController.login);

/* PROCESAR EL LOGIN */
router.post('/login', [
check('email').isEmail().withMessage('Email invalido'),
check('password').isLength({min: 8}).withMessage('Contraseña Incorrecta')], userController.loginProcess),

router.post('/user/login/:profile' , userController.loginProcess);

/* REGISTRACION */
router.get('/register',userController.register);
router.post('/register', upload.single("product-image"),validarDatos ,userController.create);

router.get('/list', userController.list);
router.get('/edit/:id', userController.edit); 
router.patch('/edit/:id',upload.single("product-image"), userController.update); 
router.delete('/delete/:id', userController.destroy);

module.exports = router;