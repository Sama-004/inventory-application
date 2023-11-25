const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const motherboardSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  socketType: { type: String, required: true },
  //supportedCPUs: [String],
  formFactor: String,
  price: { type: Number, required: true },
  //image: String,
});

// Virtual for motherboard's URL
motherboardSchema.virtual("url").get(function () {
  return `/catalog/motherboard/${this._id}`;
});

// Export model
module.exports = mongoose.model("Motherboard", motherboardSchema);
