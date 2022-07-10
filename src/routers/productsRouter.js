const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsControllers');

const guestRouteMW = require('../middlewares/guestRouteMW');
const authRouteMW  = require('../middlewares/authRouteMW');
const userLoggedMW = require('../middlewares/userLoggedMW');

router.get('/',productsController.index);
router.get('/productCart',authRouteMW,productsController.productCart);
router.get('/productDetail/:id',userLoggedMW,productsController.productDetail);
router.get('/sucursales',userLoggedMW,productsController.sucursales);
router.get('/todosLosProductos',userLoggedMW,productsController.todosLosProductos);

module.exports = router;