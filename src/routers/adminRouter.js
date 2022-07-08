const express = require('express');
const router = express.Router();


const adminController = require('../controllers/adminController');
const familyController = require ('../controllers/familyController')
const categoryController = require ('../controllers/categoryController')

const userRouteAdminMW = require('../middlewares/userRouteAdminMW');

router.get('/',userRouteAdminMW,adminController.index);


router.get('/family',userRouteAdminMW,familyController.todasLasFamilias);
router.get('/familyNew',userRouteAdminMW,familyController.new);
router.post('/familyNew',userRouteAdminMW,familyController.create);
router.post('/familyInactivar/:id',userRouteAdminMW, familyController.inactivar);
router.post('/familyActivar/:id',userRouteAdminMW, familyController.activar);

router.get('/familyEdit/:id',userRouteAdminMW,familyController.Edit);
router.patch('/familyEdit/:id',userRouteAdminMW, familyController.update); 


router.get('/category',userRouteAdminMW,categoryController.todasLasCategorias);
router.get('/categoryNew',userRouteAdminMW,categoryController.new);
router.post('/categoryNew',userRouteAdminMW,categoryController.create);
router.post('/categoryInactivar/:id',userRouteAdminMW, categoryController.inactivar);
router.post('/categoryActivar/:id',userRouteAdminMW, categoryController.activar);
router.get('/categoryEdit/:id',userRouteAdminMW,categoryController.Edit);
router.patch('/categoryEdit/:id',userRouteAdminMW, categoryController.update);  


module.exports = router;