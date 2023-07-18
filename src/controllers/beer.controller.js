const createKnex = require('../context');
const knex = createKnex();
const SpotifyWebApi = require('spotify-web-api-node');

const BeerController = {
  async findBeer(req, res) {
    let beers = await knex('Beers').select('*');
    return res.json(beers);
  },

  async insertBeer(req, res) {
    const beer = req.body;
    let result = await knex('Beers').insert(beer);
    if (!result) return res.status(400).json({ msg: 'beer does not inserted' });
    return res.status(200).json({ msg: 'beer inserted' });
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

    // Integração com o Spotify para buscar a playlist
    const spotifyApi = new SpotifyWebApi({
      clientId: 'c44d34755baf43dca41627c6be062aba',
      clientSecret: 'dbc6442c920e42b48b75098997c7848d',
    });

    try {
      // Obter o token de acesso
      const data = await spotifyApi.clientCredentialsGrant();
      const accessToken = data.body.access_token;

      // Definir o token de acesso no objeto spotifyApi
      spotifyApi.setAccessToken(accessToken);

      // Pesquisar playlists no Spotify
      const response = await spotifyApi.searchPlaylists(selectedBeerStyle);
      const playlists = response.body.playlists;

     

      if (!playlists || !playlists.items || playlists.items.length === 0) {
        return res.status(404).json({ msg: 'No playlist found for the beer style' });
      }

      const validPlaylist = playlists.items.find((playlist) => playlist.tracks && playlist.tracks.total > 0);

      if (!validPlaylist) {
        return res.status(404).json({ msg: 'No playlist found for the beer style' });
      }

      const playlistTracksResponse = await spotifyApi.getPlaylistTracks(validPlaylist.id);
      const playlistTracks = playlistTracksResponse.body.items.map((item) => {
        const { name, artists, external_urls } = item.track;
        const artistNames = artists.map((artist) => artist.name).join(', ');
        return { name, artist: artistNames, link: external_urls.spotify };
      });

      return res.json({
        beerStyle: selectedBeerStyle,
        playlist: {
          name: validPlaylist.name,
          tracks: playlistTracks,
        },
      });
    } catch (error) {
      console.error('Error searching playlists:', error);
      return res.status(500).json({ msg: 'Error searching playlists' });
    }
  },
};

module.exports = BeerController;
