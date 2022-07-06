const express = require('express');
const router = express.Router();

const categoryController = require ('../controllers/categoryController')
const userRouteAdminMW = require('../middlewares/userRouteAdminMW');

router.get('/',categoryController.todasLasCategorias);


// router.get('/categoryNew',userRouteAdminMW,categoryController.New);
// validarDatosNew
router.post('/categoryNew',userRouteAdminMW,categoryController.create);
router.get('/categoryEdit/:id',userRouteAdminMW,categoryController.Edit);
// validarDatosNew
router.patch('/categoryEdit/:id',userRouteAdminMW, categoryController.update);  
router.post('/categoryInactivar/:id',userRouteAdminMW, categoryController.inactivar);
router.post('/categoryActivar/:id',userRouteAdminMW, categoryController.activar);

module.exports = router;