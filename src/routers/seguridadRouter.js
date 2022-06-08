const express = require('express');
const router = express.Router();

const seguridadController = require('../controllers/seguridadControllers');

router.get('/login',seguridadController.login);

router.get('/register',seguridadController.register);
router.post('/register',seguridadController.create);

router.get('/edit/:id', seguridadController.edit); 
router.patch('/edit/:id', seguridadController.update); 

/* router.delete('/delete/:id', seguridadController.destroy); */
 
router.get('/admin',seguridadController.admin); 


module.exports = router;