const express = require('express');
const router = express.Router();

const familyController = require ('../controllers/familyController')

const userRouteAdminMW = require('../middlewares/userRouteAdminMW');

router.get('/',familyController.todasLasFamilias);

// router.post('/familyNew',userRouteAdminMW,familyController.new);

router.post('/familyNew',userRouteAdminMW,familyController.create);
router.get('/familyEdit/:id',userRouteAdminMW,familyController.Edit);
router.patch('/familyEdit/:id',userRouteAdminMW, familyController.update); 
router.post('/familyInactivar/:id',userRouteAdminMW, familyController.inactivar);
router.post('/familyActivar/:id',userRouteAdminMW, familyController.activar);

module.exports = router;