const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const graphicsCardSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  memory: String,
  memoryType: String,
  interface: String,
  price: { type: Number, required: true },
  //image: String,
});

// Virtual for GPU's URL
graphicsCardSchema.virtual("url").get(function () {
  return `/products/graphics-card/${this._id}`;
});

// Export model
module.exports = mongoose.model("GraphicsCard", graphicsCardSchema);
