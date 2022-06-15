const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsControllers');


router.get('/',productsController.index);
router.get('/productCart',productsController.productCart);
router.get('/productDetail/:id',productsController.productDetail);
router.get('/sucursales',productsController.sucursales);
router.get('/todosLosProductos',productsController.todosLosProductos);

router.get('/productAdmin',productsController.productAdmin);
router.get('/productNew',productsController.productNew);
router.get('/productEdit',productsController.productEdit);

router.post('/productDelete/:id', productsController.destroy);

module.exports = router;