const sneakersService = require("../service/sneakersService");
const ApiError = require("../exceptions/apiError");

class SneakersController {
  async addSneakers(request, response, next) {
    try {
      const { newSneakers } = request.body;

      const sneakersDto = await sneakersService.add(newSneakers);

      return response.json(sneakersDto);
    } catch (e) {
      next(e);
    }
  }

  async getPagedList(request, response, next) {
    try {
      const { pageIndex, pageSize } = request.query;

      const sneakers = await sneakersService.getPagedList(
        Number(pageIndex),
        Number(pageSize)
      );
      return response.json(sneakers);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SneakersController();
