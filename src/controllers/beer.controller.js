const createKnex = require('../context')

const knex = createKnex();

const BeerController = {
    async findBeer(req, res) {
        let beers = await knex('Beers').select('*');
        return res.json(beers);
    },
   
    async insertBeer(req, res) {
        const beer = req.body;
        let result = await knex('Beers').insert(beer);
        if(!result) return res.status(400).json({msg:'beer does not inserted'});
        return res.status(200).json({msg:'beer inserted'});
    },

    async updateBeer(req, res) {
        const beerId = req.params.id;
        const updatedBeer = req.body;
      
        let result = await knex('Beers')
          .where({ id: beerId })
          .update(updatedBeer);
      
        if (result === 0) {
          return res.status(400).json({ msg: 'beer does not exist' });
        }
      
        return res.status(200).json({ msg: 'beer updated' });
      },
      
      async deleteBeer(req, res) {
        const beerId = req.params.id;
      
        let result = await knex('Beers')
          .where({ id: beerId })
          .del();
      
        if (result === 0) {
          return res.status(400).json({ msg: 'beer does not exist' });
        }
      
        return res.status(200).json({ msg: 'beer deleted' });
      },

      async findBeerStyleByTemperature(req, res) {
        const { temperature } = req.body;
      
        let beers = await knex('Beers').select('*');
        let selectedBeerStyle = null;
      
        let closestTemperatureDiff = Infinity;
        let sortedBeerStyles = [];
      
        beers.forEach((beer) => {
          const avgTemperature = (beer.tempMax + beer.tempMin) / 2;
          const temperatureDiff = Math.abs(temperature - avgTemperature);
      
          if (temperatureDiff < closestTemperatureDiff) {
            closestTemperatureDiff = temperatureDiff;
            selectedBeerStyle = beer.name;
            sortedBeerStyles = []; // Reset sortedBeerStyles array
          } else if (temperatureDiff === closestTemperatureDiff) {
            sortedBeerStyles.push(beer.name);
          }
        });
      
        if (!selectedBeerStyle) {
          return res.status(404).json({ msg: 'No matching beer style found' });
        }
      
        if (sortedBeerStyles.length > 0) {
          sortedBeerStyles.push(selectedBeerStyle);
          sortedBeerStyles.sort();
          selectedBeerStyle = sortedBeerStyles[0];
        }
      
       
      
        return res.json({ beerStyle: selectedBeerStyle });
      }
      
      
}

module.exports = BeerController;