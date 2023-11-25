const Motherboard = require("../models/motherboard");
const asyncHandler = require("express-async-handler");

// Display list of all Motherboard.
exports.motherboard_list = asyncHandler(async (req, res, next) => {
  const allMotherboards = await Motherboard.find({}, "name brand price").exec();
  res.render("motherboard_list", {
    title: "Motherboard List",
    motherboard_list: allMotherboards,
  });
});

// Display detail page for a specific Motherboard.
exports.motherboard_detail = asyncHandler(async (req, res, next) => {
  const mbId = req.params.id;
  try {
    const mb = await Motherboard.findById(mbId);
    if (!mb) {
      return res.status(404).send("Motherboard not found");
    }
    res.render("motherboard_detail", {
      mb,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Display Motherboard create form on GET.
exports.motherboard_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard create GET");
});

// Handle Motherboard create on POST.
exports.motherboard_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard create POST");
});

// Display Motherboard delete form on GET.
exports.motherboard_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard delete GET");
});

// Handle Motherboard delete on POST.
exports.motherboard_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard delete POST");
});

// Display Motherboard update form on GET.
exports.motherboard_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard update GET");
});

// Handle Motherboard update on POST.
exports.motherboard_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard update POST");
});
