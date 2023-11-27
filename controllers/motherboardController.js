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

    // Create a motherboard object with escaped and trimmed data.
    const motherboard = new Motherboard({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("motherboard_form", {
        title: "Create Motherboard",
        motherboard,
        errors: errors.array(),
      });
      return;
    } else {
      try {
        // Save the motherboard.
        await motherboard.save();
        // Redirect to the created motherboard's detail page.
        res.redirect(motherboard.url);
      } catch (err) {
        return next(err);
      }
    }
  }),
];

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
