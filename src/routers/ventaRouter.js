const express = require('express');
const router = express.Router();

const ventaController = require('../controllers/ventaControllers');

router.get('/',ventaController.index);
// router.get('/marcas',ventaController.marcas);
// router.get('/promociones',ventaController.promociones);
router.get('/productCart',ventaController.productCart);
router.get('/productDetail',ventaController.productDetail);
router.get('/sucursales',ventaController.sucursales);
router.get('/mascotas',ventaController.mascotas);
router.get('/todosLosProductos',ventaController.todosLosProductos);

module.exports = router;