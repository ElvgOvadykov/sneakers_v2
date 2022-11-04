const { Schema, model } = require("mongoose");

const SneakersSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

module.exports = model("Sneakers", SneakersSchema);
