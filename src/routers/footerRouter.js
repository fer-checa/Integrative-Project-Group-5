const express = require('express');
const router = express.Router();

const footerController = require('../controllers/footerController');

router.get('/staff',footerController.staff);
router.get('/empresa',footerController.empresa);

    
router.get('/medioDePago',footerController.medioDePago);

router.get('/costoDeEnvio',footerController.costoDeEnvio);
router.get('/preguntas',footerController.preguntas);
router.get('/terminos',footerController.terminos);

module.exports = router;