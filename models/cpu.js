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
  picture: String,
});

// Virtual for CPU's URL
cpuSchema.virtual("url").get(function () {
  return `/catalog/cpu/${this._id}`;
});

// Export model
module.exports = mongoose.model("CPU", cpuSchema);
