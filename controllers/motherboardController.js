const Motherboard = require("../models/motherboard");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
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
exports.motherboard_create_get = (req, res, next) => {
  res.render("motherboard_form", { title: "Create Motherboard" });
};

// Handle motherboard create on POST.
exports.motherboard_create_post = [
  // Validate and sanitize fields.
  body("name", "Motherboard name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("motherboard_form", {
        title: "Create Motherboard",
        motherboard: req.body,
        errors: errors.array(),
      });
    }
    const { name, brand, socketType, formFactor, price } = req.body;
    const newMB = new Motherboard({
      name,
      brand,
      socketType,
      formFactor,
      price,
    });

    try {
      const savedMB = await newMB.save();
      res.redirect(savedMB.url);
    } catch (err) {
      // Handle error if RAM creation fails
      res.status(500).send("Failed to create Motherboard");
    }
  }),
];

// Display Motherboard delete form on GET.
exports.motherboard_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of motherboard (in parallel)
  const motherboard = await Motherboard.findById(req.params.id).exec();

  if (!motherboard) {
    res.redirect("/catalog/motherboards"); // Redirect to a gmotherboard list page or handle as needed
    return;
  }

  res.render("motherboard_delete", {
    title: "Delete Motherboard",
    motherboard: motherboard,
  });
});

// Handle Motherboard delete on POST.
exports.motherboard_delete_post = asyncHandler(async (req, res, next) => {
  try {
    const motherboardId = req.params.id;

    // Find the Motherboard by ID and delete it
    const deletedMotherboard = await Motherboard.findByIdAndDelete(
      motherboardId
    );

    if (!deletedMotherboard) {
      // Handle case where Motherboard wasn't found
      res.status(404).send("Motherboard not found");
      return;
    }

    // Motherboard deleted successfully
    res.redirect("/catalog/motherboards"); // Redirect to the Motherboard list
  } catch (error) {
    // Handle any error that occurred during the deletion process
    res.status(500).send("Error deleting motherboard");
  }
});

// Display Motherboard update form on GET.
exports.motherboard_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard update GET");
});

// Handle Motherboard update on POST.
exports.motherboard_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Motherboard update POST");
});
