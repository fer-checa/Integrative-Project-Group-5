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
    body('name').notEmpty().withMessage('Router : El campo Nombre no puede estar vacío').bail().isLength({min: 2}).withMessage('Router : El campo nombre debe tener como minimo 2 caracteres'),
    body('email').notEmpty().withMessage('Router : El campo email no puede estar vacío').bail().isEmail().withMessage('Router : Debes completar un email valido'),
    body('password').notEmpty().withMessage('Router : El campo constraseña no puede estar vacío').bail().isLength({min: 4}).withMessage('Router : La constraseña debe tener como minimo 4 caracteres'),
    
]

const validarDatosEditUser = [
    body('name').notEmpty().withMessage('Router : El campo Nombre no puede estar vacío').bail().isLength({min: 2}).withMessage('Router : El campo nombre debe tener como minimo 2 caracteres'),
    body('email').notEmpty().withMessage('Router : El campo email no puede estar vacío').bail().isEmail().withMessage('Router : Debes completar un email valido'),
    
    
]

const validarDatosLogin = [
    body('email').notEmpty().withMessage('Router : El campo email no puede estar vacío').bail().isEmail().withMessage('Router : Debes completar un email válido'),
    body('password').notEmpty().withMessage('Router : El campo constraseña no puede estar vacío').bail().isLength({min: 4}).withMessage('Router : La constraseña debe tener como minimo 4 caracteres'),
   
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
router.patch('/edit/:id',userRouteAdminMW,upload.single("product-image"), validarDatosEditUser,userController.update); 
//borra un usuario en BD solo pueden ingresar los admin
router.delete('/delete/:id',userRouteAdminMW, userController.destroy);



router.get('/editProfile/:id', userController.editProfile); 
router.patch('/editProfile/:id',upload.single("product-image"), userController.updateProfile); 



/* LOGIN */
//Presenta la pantalla para loguearse , tiene un MW que si esta logueado te redirecciona.
router.get('/login', guestRouteMW ,userController.login); 
router.post('/login', validarDatosLogin,  userController.loginProcess);

/* PERFIL DEL USUARIO tiene un MW que valida si el usuario esta logueado */
router.get('/profile', authRouteMW,  userController.profile);

/* DESLOGUEARSE*/
router.get('/logout', userController.logout);

/* *********************************************************************************************************** */

/*  */

module.exports = router;