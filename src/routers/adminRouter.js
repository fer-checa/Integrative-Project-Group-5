const express = require('express');
const router = express.Router();


const adminController = require('../controllers/adminController');
const userRouteAdminMW = require('../middlewares/userRouteAdminMW');

router.get('/',userRouteAdminMW,adminController.index);


module.exports = router;