const express = require('express');
const router = express.Router();

const familyController = require ('../controllers/familyController')

router.get('/',familyController.todasLasFamilias);

module.exports = router;