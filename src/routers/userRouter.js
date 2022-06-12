const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/login',userController.login);
router.get('/register',userController.register);
router.post('/register',userController.create);
router.get('/list', userController.list);
router.get('/edit/:id', userController.edit); 
router.patch('/edit/:id', userController.update); 
router.delete('/delete/:id', userController.destroy);

module.exports = router;