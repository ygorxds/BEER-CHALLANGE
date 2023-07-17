const createKnex = require('../context')

const knex = createKnex();

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'c44d34755baf43dca41627c6be062aba',
  clientSecret: 'dbc6442c920e42b48b75098997c7848d',
});

async function getAccessToken() {
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body.access_token;
    spotifyApi.setAccessToken(accessToken);
  }

  async function getBeerPlaylist(beerStyle) {
    const searchQuery = `playlist:${beerStyle}`;
    const { body } = await spotifyApi.search(searchQuery, ['playlist'], { limit: 1 });
    
    if (body.playlists.total === 0) {
      throw new Error(`Playlist not found for beer style: ${beerStyle}`);
    }
    
    const playlist = body.playlists.items[0];
    const tracks = playlist.tracks.items.map((item) => {
      const track = item.track;
      return {
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        link: track.external_urls.spotify,
      };
    });
    
    return {
      name: playlist.name,
      tracks,
    };
  }

  
  

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
            sortedBeerStyles = [];
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