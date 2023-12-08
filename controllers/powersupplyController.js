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
  body("name", "PSU name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.render("powersupply_form", {
        title: "Create PSU",
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
      modular,
      price,
    });

    try {
      const savedPSU = await newPSU.save();
      res.redirect(savedPSU.url);
    } catch (err) {
      // Handle error if PSU creation fails
      res.status(500).send("Failed to create PSU");
    }
  }),
];

// Display PowerSupply delete form on GET.
exports.powersupply_delete_get = asyncHandler(async (req, res, next) => {
  const psu = await PowerSupply.findById(req.params.id).exec();

  if (!psu) {
    res.redirect("/catalog/powersupplies"); // Redirect to a  power supply list page or handle as needed
    return;
  }

  res.render("powersupply_delete", {
    title: "Delete power supply",
    psu: psu,
  });
});

// Handle PowerSupply delete on POST.
exports.powersupply_delete_post = asyncHandler(async (req, res, next) => {
  try {
    const psuId = req.params.id;

    // Find the power supply by ID and delete it
    const deletedPSU = await PowerSupply.findByIdAndDelete(psuId);

    if (!deletedPSU) {
      // Handle case where power supply wasn't found
      res.status(404).send("Power Supplies not found");
      return;
    }

    // power supply deleted successfully
    res.redirect("/catalog/powersupplies"); // Redirect to the power supply list
  } catch (error) {
    // Handle any error that occurred during the deletion process
    res.status(500).send("Error deleting power supply");
  }
});

// Display PowerSupply update form on GET.
exports.powersupply_update_get = asyncHandler(async (req, res, next) => {
  // Get psu for form.
  const psu = await Promise.all([PowerSupply.findById(req.params.id).exec()]);

  res.render("powersupply_form", {
    title: "Update Power Supply",
    psu: psu,
  });
});

// Handle PowerSupply update on POST.
exports.powersupply_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Add validation and sanitization for other PSU fields as needed.
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a PSU object with escaped/trimmed data and old id.
    const psu = new PowerSupply({
      name: req.body.name,
      brand: req.body.brand,
      wattage: req.body.wattage,
      efficiencyRating: req.body.efficiencyRating,
      modular: req.body.modular,
      price: req.body.price,
      _id: req.params.id, // Ensure to assign the correct psu ID.
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("powersupply_form", {
        title: "Update PSU",
        psu: psu,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedPSU = await PowerSupply.findByIdAndUpdate(
        req.params.id,
        psu,
        {}
      );
      // Redirect to PSU detail page or appropriate URL.
      res.redirect(updatedPSU.url);
    }
  }),
];
