const SneakersModel = require("../models/sneakers");
const SneakersDto = require("../dtos/sneakersDto");

class SneakersService {
  async add(newSneakers) {
    const sneakers = await SneakersModel.create({
      name: newSneakers.name,
      price: newSneakers.price,
      img: newSneakers.img,
    });

    const sneakersDto = new SneakersDto(sneakers);

    return sneakers;
  }

  /**
   * Получение постраничного списка кроссовок
   * @param {Number} pageIndex Индекс страницы
   * @param {Number} pageSize Размер страницы
   * @returns
   */
  async getPagedList(pageIndex, pageSize) {
    const skipCount = (pageIndex - 1) * pageSize;

    console.log(pageIndex, pageSize);
    const sneakers = await SneakersModel.find().limit(pageSize).skip(skipCount);

    return sneakers;
  }
}

module.exports = new SneakersService();
