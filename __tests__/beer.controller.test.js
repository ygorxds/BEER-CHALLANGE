const BeerController = require('../src/controllers/beer.controller');

describe('BeerController', () => {
  describe('findBeer', () => {
    test('should return all beers', async () => {
      const mockRequest = {};
      const mockResponse = {
        json: jest.fn(),
      };

      await BeerController.findBeer(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });

  describe('insertBeer', () => {
    test('should insert a beer', async () => {
      const mockRequest = {
        body: { name: 'IPA' },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await BeerController.insertBeer(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'beer inserted' });
    });

  });

  describe('updateBeer', () => {
    test('should update a beer', async () => {
      const mockRequest = {
        params: { id: 1 },
        body: { name: 'IPA' },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await BeerController.updateBeer(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'beer updated' });
    });

  });

  describe('deleteBeer', () => {
    test('should delete a beer', async () => {
      const mockRequest = {
        params: { id: 1 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await BeerController.deleteBeer(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'beer deleted' });
    });

  });

  describe('findBeerStyleByTemperature', () => {
    test('should return playlist for matching beer style', async () => {
      const mockRequest = {
        body: { temperature: 10 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await BeerController.findBeerStyleByTemperature(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
        beerStyle: expect.any(String),
        playlist: expect.objectContaining({
          name: expect.any(String),
          tracks: expect.any(Array),
        }),
      }));
    });

  });
});
