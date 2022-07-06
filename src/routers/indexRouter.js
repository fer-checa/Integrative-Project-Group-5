const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexControllers');
const userLogged = require('../middlewares/userLoggedMW');


router.get('/', userLogged, indexController.index);


module.exports = router;