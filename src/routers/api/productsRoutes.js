const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/api/productsController');

router.get('/products', productsController.list);
router.get('/products/:id', productsController.detail);


module.exports = router;