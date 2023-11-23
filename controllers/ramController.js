const Ram = require("../models/ram");
const asyncHandler = require("express-async-handler");

// Display list of all Rams.
exports.ram_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram list");
});

// Display detail page for a specific Ram.
exports.ram_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Ram detail: ${req.params.id}`);
});

// Display Ram create form on GET.
exports.ram_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram create GET");
});

// Handle Ram create on POST.
exports.ram_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram create POST");
});

// Display Ram delete form on GET.
exports.ram_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram delete GET");
});

// Handle Ram delete on POST.
exports.ram_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram delete POST");
});

// Display Ram update form on GET.
exports.ram_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram update GET");
});

// Handle Ram update on POST.
exports.ram_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram update POST");
});
