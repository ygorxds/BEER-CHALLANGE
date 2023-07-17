const express = require('express');
const router = express.Router();

const BeerController = require('../controllers/beer.controller');


router.get('/seeAll',BeerController.findBeer);
router.post('/create',BeerController.insertBeer);
router.put('/update/:id', BeerController.updateBeer);
router.delete('/delete/:id', BeerController.deleteBeer);
router.post('/findBeer', BeerController.findBeerStyleByTemperature);

module.exports = router;