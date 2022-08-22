const express = require('express');
const router = express.Router();
const path = require('path');
const {body} = require('express-validator');
const multer = require('multer');

//Configurando Multer
const storage =multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,'public/img/products');
    } ,
    filename:(req,file,callback) => {
        callback(null,'img-' +  Date.now() +  path.extname(file.originalname));
    }
}); 
const upload =  multer({storage});
//FIN Configurando Multer
const validarDatosNew = [
    body('nombre')
        .notEmpty().withMessage('Debes completar el Nombre del Producto.').bail()
        .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres.'),
    body('descripcion').notEmpty().withMessage('Debes completar Descripcion del producto').bail()
    .isLength({min:10}).withMessage('Descripcion debe tener al menos 10 caracteres.'),
    body('categoria').notEmpty().withMessage('Debe seleccionar categoria'),
    // body('familia').notEmpty().withMessage('Debe seleccionar familia'),
    body('precio').notEmpty().withMessage('Debe indicar precio'),
    body('activo').notEmpty().withMessage('Debe indicar producto activo SI/NO'),
    //body('fotoProducto').notEmpty().withMessage('Debe igresar una imagen')
]


const adminController = require('../controllers/adminController');
const productsController = require('../controllers/productsControllers');
const familyController = require ('../controllers/familyController')
const categoryController = require ('../controllers/categoryController')


const userRouteAdminMW = require('../middlewares/userRouteAdminMW');

router.get('/',userRouteAdminMW,adminController.index);

router.get('/products',userRouteAdminMW, productsController.productAdmin);
router.get('/productNew',userRouteAdminMW,productsController.New);
router.post('/productNew',userRouteAdminMW,upload.single('fotoProducto'), validarDatosNew,productsController.create);
router.get('/productEdit/:id',userRouteAdminMW,productsController.Edit);
router.patch('/productEdit/:id',userRouteAdminMW,upload.single('fotoProducto'), validarDatosNew, productsController.update); 
router.post('/productInactivar/:id',userRouteAdminMW, productsController.inactivar);
router.post('/productActivar/:id',userRouteAdminMW, productsController.activar);

// FAMILIA

const validarFamilia = [
    body('nombre').notEmpty().withMessage('Debes completar el Nombre de la Familia.').bail(),
    body('activo').notEmpty().withMessage('Debe indicar familia activa SI/NO'),
]


router.get('/family',userRouteAdminMW,familyController.todasLasFamilias);
router.get('/familyNew',userRouteAdminMW,familyController.new);
router.post('/familyNew',userRouteAdminMW,validarFamilia ,familyController.create);
router.post('/familyInactivar/:id',userRouteAdminMW, familyController.inactivar);
router.post('/familyActivar/:id',userRouteAdminMW, familyController.activar);
router.get('/familyEdit/:id',userRouteAdminMW,familyController.Edit);
router.patch('/familyEdit/:id',userRouteAdminMW, familyController.update); 

const validarCategoria = [
    body('nombre').notEmpty().withMessage('Debes completar el Nombre de la Categoria.').bail(),
    body('activo').notEmpty().withMessage('Debe indicar Categoria activa SI/NO'),
]

router.get('/category',userRouteAdminMW,categoryController.todasLasCategorias);
router.get('/categoryNew',userRouteAdminMW,categoryController.new);

router.post('/categoryNew',userRouteAdminMW, validarCategoria, categoryController.create);
router.post('/categoryInactivar/:id',userRouteAdminMW, categoryController.inactivar);
router.post('/categoryActivar/:id',userRouteAdminMW, categoryController.activar);
router.get('/categoryEdit/:id',userRouteAdminMW,categoryController.Edit);
router.patch('/categoryEdit/:id',userRouteAdminMW, categoryController.update);  


module.exports = router;