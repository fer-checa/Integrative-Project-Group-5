const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsControllers');


router.get('/',productsController.index);
router.get('/productCart',productsController.productCart);
router.get('/productDetail/:id',productsController.productDetail);
router.get('/sucursales',productsController.sucursales);
router.get('/todosLosProductos',productsController.todosLosProductos);


module.exports = router;