const express = require('express');
const router = express.Router();

const BeerController = require('../controllers/beer.controller');


router.get('/findAll',BeerController.findBeer);
router.post('/create',BeerController.insertBeer);
router.put('/update/:id', BeerController.updateBeer);
router.delete('/delete/:id', BeerController.deleteBeer);

module.exports = router;