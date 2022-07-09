const express = require('express');
const router = express.Router();
const {body, check} = require('express-validator');
const path = require('path');

const multer = require('multer');

/* MULTER */

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
    body('password').notEmpty().withMessage('Debes Completar la contraseña').bail().isLength({min: 4}).withMessage('La constraseña debe tener como minimo 8 caracteres'),
    /* body('rePassword').notEmpty().withMessage('Debes Completar Repetir la contraseña').bail().isLength({min: 4}).withMessage('La constraseña debe tener como minimo 8 caracteres') */
]

const userController = require('../controllers/userControllers');

/* MIDDLEWARS */
const userRouteAdminMW= require('../middlewares/userRouteAdminMW');
const guestRouteMW = require('../middlewares/guestRouteMW');
const authRouteMW = require('../middlewares/authRouteMW');

/* ********************************************************************************************************+ */
/* REGISTRACION */

/* FORMULARIO DE REGISTRO */
// para registrar no usamos MW
router.get('/register',guestRouteMW ,userController.register);

/* PROCESAR EL REGISTRO */
//aca queremos insertar el registro en la BD , no usamos MW
router.post('/register', upload.single("product-image"),validarDatos ,userController.create);
//aca listamos  todos los usuarios, para poder editarlos o eliminarlos. solo pueden ingresar los admin
router.get('/list',userRouteAdminMW, userController.list);
//aca presenta los datos para editar un usuario, solo pueden ingresar los admin
router.get('/edit/:id',userRouteAdminMW, userController.edit); 
//graba la edicion en BD solo pueden ingresar los admin
router.patch('/edit/:id',userRouteAdminMW,upload.single("product-image"), userController.update); 
//borra un usuario en BD solo pueden ingresar los admin
router.delete('/delete/:id',userRouteAdminMW, userController.destroy);


/* LOGIN */
//Presenta la pantalla para loguearse , tiene un MW que si esta logueado te redirecciona.
router.get('/login', guestRouteMW ,userController.login); 
router.post('/login', userController.loginProcess);

/* PERFIL DEL USUARIO tiene un MW que valida si el usuario esta logueado */
router.get('/profile', authRouteMW,  userController.profile);

/* DESLOGUEARSE*/
router.get('/logout', userController.logout);

module.exports = router;