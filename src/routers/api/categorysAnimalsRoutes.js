const express = require('express');
const router = express.Router();
const categorysController = require('../../controllers/api/categorysAnimalsController');

router.get('/categorysAnimals', categorysController.list);



module.exports = router;