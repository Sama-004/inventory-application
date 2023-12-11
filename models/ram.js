const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ramSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  capacity: String,
  speed: { type: String },
  price: { type: Number, required: true },
  picture: { type: String },
});

// Virtual for RAM's URL
ramSchema.virtual("url").get(function () {
  return `/catalog/ram/${this._id}`;
});

// Export model
module.exports = mongoose.model("ram", ramSchema);
