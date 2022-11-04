module.exports = class SneakersDto {
  id;
  name;
  price;
  img;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.price = model.price;
    this.img = model.img;
  }
};
