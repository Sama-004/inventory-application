const GraphicsCard = require("../models/graphicscard");
const asyncHandler = require("express-async-handler");

// Display list of all gpu.
exports.graphicscard_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Graphics Card list");
});

// Display detail page for a specific gpu.
exports.graphicscard_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Graphics Card detail: ${req.params.id}`);
});

// Display gpu create form on GET.
exports.graphicscard_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Graphics Card create GET");
});

// Handle gpu create on POST.
exports.graphicscard_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Graphics Card create POST");
});

// Display gpu delete form on GET.
exports.graphicscard_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Graphics Card delete GET");
});

// Handle gpu delete on POST.
exports.graphicscard_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Graphics Card delete POST");
});

// Display gpu update form on GET.
exports.graphicscard_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Graphics Card update GET");
});

// Handle gpu update on POST.
exports.graphicscard_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Graphics Card update POST");
});
