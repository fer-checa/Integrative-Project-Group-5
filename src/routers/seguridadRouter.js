const express = require('express');
const router = express.Router();

const indexController = require('../controllers/seguridadControllers');

router.get('/',indexController.login);

router.get('/register',indexController.register);

router.get('/admin',indexController.admin);


module.exports = router;