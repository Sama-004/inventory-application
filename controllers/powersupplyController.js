const PowerSupply = require("../models/powersupply");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
// Display list of all PowerSupply.
exports.powersupply_list = asyncHandler(async (req, res, next) => {
  const allPowerSupplies = await PowerSupply.find(
    {},
    "name brand price"
  ).exec();

  res.render("powersupply_list", {
    title: "Power Supply List",
    powersupply_list: allPowerSupplies,
  });
});

// Display detail page for a specific PowerSupply.
exports.powersupply_detail = asyncHandler(async (req, res, next) => {
  const psuId = req.params.id;
  try {
    const psufound = await PowerSupply.findById(psuId);
    if (!psufound) {
      return res.status(404).send("Power Supply not found");
    }
    res.render("powersupply_detail", {
      psufound,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Display power supply create form on GET.
exports.powersupply_create_get = (req, res) => {
  res.render("powersupply_form", { title: "Create Power Supply" });
};

// Handle power supply create on POST.
// Handle power supply create on POST.
exports.powersupply_create_post = [
  // Validate and sanitize fields.
  body("name", "Power supply name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.render("powersupply_form", {
        title: "Create Power Supply",
        powersupply: req.body,
        errors: errors.array(),
      });
    }

    const { name, brand, wattage, efficiencyRating, modular, price } = req.body;
    const newPSU = new PowerSupply({
      name,
      brand,
      wattage,
      efficiencyRating,
      modular: modular === "on", // Check if checkbox was submitted
      price,
    });

    try {
      const savedPSU = await newPSU.save();
      res.redirect(savedPSU.url);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create PSU");
    }
  }),
];

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
