const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const graphicsCardSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  memory: String,
  memoryType: String,
  interface: String,
  price: { type: Number, required: true },
  image: { type: Schema.Types.ObjectId },
});

// Virtual for GPU's URL
graphicsCardSchema.virtual("url").get(function () {
  return `/catalog/graphicscard/${this._id}`;
});

// Export model
module.exports = mongoose.model("GraphicsCard", graphicsCardSchema);
