const Cpu = require("../models/cpu");
const asyncHandler = require("express-async-handler");
const CPU = require("../models/cpu");
const GraphicsCard = require("../models/graphicscard");
const Motherboard = require("../models/motherboard");
const PowerSupply = require("../models/powersupply");
const RAM = require("../models/ram");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [numCpus, numGraphiccards, numMotherboards, numPowersupplies, numRams] =
    await Promise.all([
      CPU.countDocuments({}).exec(),
      GraphicsCard.countDocuments({}).exec(),
      Motherboard.countDocuments({}).exec(),
      PowerSupply.countDocuments({}).exec(),
      RAM.countDocuments({}).exec(),
    ]);

  res.render("index", {
    title: "Pc Parts Catalog Home",
    cpu_count: numCpus,
    gpu_count: numGraphiccards,
    motherboard_count: numMotherboards,
    power_supply_count: numPowersupplies,
    ram_count: numRams,
  });
});

// Display list of all CPUs.
exports.cpu_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU list");
});

// Display detail page for a specific CPU.
exports.cpu_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: CPU detail: ${req.params.id}`);
});

// Display CPU create form on GET.
exports.cpu_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU create GET");
});

// Handle CPU create on POST.
exports.cpu_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU create POST");
});

// Display CPU delete form on GET.
exports.cpu_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU delete GET");
});

// Handle CPU delete on POST.
exports.cpu_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU delete POST");
});

// Display CPU update form on GET.
exports.cpu_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU update GET");
});

// Handle CPU update on POST.
exports.cpu_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU update POST");
});
