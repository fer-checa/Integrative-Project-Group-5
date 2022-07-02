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
]


const productsController = require('../controllers/productsControllers');
const userRouteAdminMW = require('../middlewares/userRouteAdminMW');
const userRouteMW = require('../middlewares/userRouteMW');

router.get('/',productsController.index);
router.get('/productCart',userRouteMW,productsController.productCart);
router.get('/productDetail/:id',productsController.productDetail);
router.get('/sucursales',productsController.sucursales);
router.get('/todosLosProductos',productsController.todosLosProductos);

router.get('/productAdmin',userRouteAdminMW, productsController.productAdmin);
router.get('/productNew',userRouteAdminMW,productsController.New);
router.post('/productNew',userRouteAdminMW,upload.single('fotoProducto'), validarDatosNew,productsController.create);
router.get('/productEdit/:id',userRouteAdminMW,productsController.Edit);
router.patch('/productEdit/:id',userRouteAdminMW,upload.single('fotoProducto'), validarDatosNew, productsController.update); 
router.post('/productInactivar/:id',userRouteAdminMW, productsController.inactivar);
router.post('/productActivar/:id',userRouteAdminMW, productsController.activar);

module.exports = router;