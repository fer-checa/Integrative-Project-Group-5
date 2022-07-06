const express = require('express');
const router = express.Router();

const familyController = require ('../controllers/familyController')

router.get('/',familyController.todasLasFamilias);

router.get('/familyNew',userRouteAdminMW,familyController.New);
router.post('/familyNew',userRouteAdminMW,validarDatosNew,familyController.create);
router.get('/familyEdit/:id',userRouteAdminMW,familyController.Edit);
router.patch('/familyEdit/:id',userRouteAdminMW,validarDatosNew, familyController.update); 
router.post('/familyInactivar/:id',userRouteAdminMW, familyController.inactivar);
router.post('/familyActivar/:id',userRouteAdminMW, familyController.activar);

module.exports = router;