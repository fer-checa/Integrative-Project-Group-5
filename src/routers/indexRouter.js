const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexControllers');
const userLoggedMW = require('../middlewares/userLoggedMW');


router.get('/', userLoggedMW, indexController.index);


module.exports = router;