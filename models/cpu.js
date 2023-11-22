const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cpuSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  socketType: { type: String, required: true },
  coreCount: Number,
  threadCount: Number,
  frequency: String,
  price: { type: Number, required: true },
  //image: String,
});

// Virtual for CPU's URL
cpuSchema.virtual("url").get(function () {
  return `/products/cpu/${this._id}`;
});

// Export model
module.exports = mongoose.model("CPU", cpuSchema);
