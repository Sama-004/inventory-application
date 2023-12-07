const Ram = require("../models/ram");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const ram = require("../models/ram");

// Display list of all Rams.
exports.ram_list = asyncHandler(async (req, res, next) => {
  const allRams = await Ram.find({}, "name brand capacity speed price").exec();
  res.render("ram_list", {
    title: "Ram List",
    ram_list: allRams,
  });
});

// Display detail page for a specific Ram.
exports.ram_detail = asyncHandler(async (req, res, next) => {
  const ramId = req.params.id;
  try {
    const ram = await Ram.findById(ramId);
    if (!ram) {
      return res.status(404).send("Ram not found");
    }
    res.render("ram_detail", {
      ram,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Display RAM create form on GET.
exports.ram_create_get = (req, res) => {
  res.render("ram_form", { title: "Create RAM" });
};

// Handle RAM create on POST.
exports.ram_create_post = [
  body("name", "RAM name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("brand", "Brand must be specified").trim().isLength({ min: 1 }).escape(),
  // Other validations for capacity, speed, price, etc.

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Handle errors here
      return res.render("ram_form", {
        title: "Create RAM",
        ram: req.body,
        errors: errors.array(),
      });
    }

    const { name, brand, capacity, speed, price } = req.body;
    const newRAM = new Ram({ name, brand, capacity, speed, price });

    try {
      const savedRAM = await newRAM.save();
      res.redirect(savedRAM.url);
    } catch (err) {
      // Handle error if RAM creation fails
      res.status(500).send("Failed to create RAM");
    }
  }),
];

// Display Ram delete form on GET.
exports.ram_delete_get = asyncHandler(async (req, res, next) => {
  // Get details
  const ram = await Ram.findById(req.params.id).exec();

  if (!ram) {
    res.redirect("/catalog/rams"); // Redirect to a Ram list page or handle as needed
    return;
  }

  res.render("ram_delete", {
    title: "Delete Ram",
    ram: ram,
  });
});

// Handle Ram delete on POST.
exports.ram_delete_post = asyncHandler(async (req, res, next) => {
  try {
    const ramid = req.params.id;

    // Find the Ram by ID and delete it
    const ram = await Ram.findByIdAndDelete(ramid);

    if (!ram) {
      // Handle case where Ram wasn't found
      res.status(404).send("Ram not found");
      return;
    }

    // Ram deleted successfully
    res.redirect("/catalog/rams"); // Redirect to the Ram list
  } catch (error) {
    // Handle any error that occurred during the deletion process
    res.status(500).send("Error deleting Ram");
  }
});

// Display Ram update form on GET.
exports.ram_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram update GET");
});

// Handle Ram update on POST.
exports.ram_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Ram update POST");
});
