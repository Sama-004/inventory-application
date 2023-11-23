const PowerSupply = require("../models/powersupply");
const asyncHandler = require("express-async-handler");

// Display list of all PowerSupply.
exports.powersupply_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: PowerSupply list");
});

// Display detail page for a specific PowerSupply.
exports.powersupply_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: PowerSupply detail: ${req.params.id}`);
});

// Display PowerSupply create form on GET.
exports.powersupply_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: PowerSupply create GET");
});

// Handle PowerSupply create on POST.
exports.powersupply_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: PowerSupply create POST");
});

// Display PowerSupply delete form on GET.
exports.powersupply_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: PowerSupply delete GET");
});

// Handle PowerSupply delete on POST.
exports.powersupply_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: PowerSupply delete POST");
});

// Display PowerSupply update form on GET.
exports.powersupply_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: PowerSupply update GET");
});

// Handle PowerSupply update on POST.
exports.powersupply_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: PowerSupply update POST");
});
