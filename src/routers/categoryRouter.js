const express = require('express');
const router = express.Router();

const categoryController = require ('../controllers/categoryController')

router.get('/',categoryController.todasLasCategorias);


router.get('/categoryNew',userRouteAdminMW,categoryController.New);
router.post('/categoryNew',userRouteAdminMW,validarDatosNew,categoryController.create);
router.get('/categoryEdit/:id',userRouteAdminMW,categoryController.Edit);
router.patch('/categoryEdit/:id',userRouteAdminMW,validarDatosNew, categoryController.update); 
router.post('/categoryInactivar/:id',userRouteAdminMW, categoryController.inactivar);
router.post('/categoryActivar/:id',userRouteAdminMW, categoryController.activar);

module.exports = router;