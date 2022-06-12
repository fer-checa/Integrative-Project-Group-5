const express = require('express');
const router = express.Router();


const adminController = require('../controllers/adminController');

router.get('/',adminController.index);

router.get('/product',adminController.product);


module.exports = router;