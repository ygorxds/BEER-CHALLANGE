const express = require('express');
const router = express.Router();

const beerRoutes = require ('./beer.routes');

router.get('/test',async (req,res) => res.json({teste:'dd'}))

router.use('/beer', beerRoutes);


module.exports = router;