const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const powerSupplySchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  wattage: { type: Number, required: true },
  efficiencyRating: String,
  modular: { type: Boolean, required: true },
  price: { type: Number, required: true },
  //image: String,
});

// Virtual for psu's URL
powerSupplySchema.virtual("url").get(function () {
  return `/products/power-supply/${this._id}`;
});

// Export model
module.exports = mongoose.model("PowerSupply", powerSupplySchema);
