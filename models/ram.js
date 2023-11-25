const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ramSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  capacity: String,
  type: String,
  speed: String,
  price: { type: Number, required: true },
  //image: String,
});

// Virtual for RAM's URL
ramSchema.virtual("url").get(function () {
  return `/catalog/ram/${this._id}`;
});

// Export model
module.exports = mongoose.model("ram", ramSchema);
