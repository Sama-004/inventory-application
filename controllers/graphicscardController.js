const GraphicsCard = require("../models/graphicscard");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const express = require("express");

// Display list of all BookInstances.
exports.graphicscard_list = asyncHandler(async (req, res, next) => {
  const allGraphicsCards = await GraphicsCard.find(
    {},
    "name brand price"
  ).exec();
  res.render("graphicscard_list", {
    title: "Graphics Card List",
    graphicscard_list: allGraphicsCards,
  });
});

// Display detail page for a specific gpu.
exports.graphicscard_detail = asyncHandler(async (req, res, next) => {
  const graphicsCardId = req.params.id;

  try {
    const graphicsCard = await GraphicsCard.findById(graphicsCardId);

    if (!graphicsCard) {
      // Handle case where graphics card with the given ID doesn't exist
      return res.status(404).send("Graphics Card not found");
    }

    // Render the Graphics Card detail view and pass the Graphics Card data to it
    res.render("graphicscard_detail", {
      title: "Graphics Card Detail",
      graphicsCard,
    });
  } catch (err) {
    // Handle other errors that might occur during database interaction
    res.status(500).send("Internal Server Error");
  }
});

// Display gpu create form on GET.
exports.graphicscard_create_get = (req, res, next) => {
  res.render("graphicscard_form", { title: "Create GPU" });
};

// Handle gpu create on POST.
exports.graphicscard_create_post = [
  // Validate and sanitize fields.
  body("name", "GPU name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const cleanedPath = req.file.path;
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.render("graphicscard_form", {
        title: "Create GPU",
        graphicscard: req.body,
        errors: errors.array(),
      });
    }

    const { name, brand, memory, memoryType, interface, price } = req.body;
    const newGPU = new GraphicsCard({
      name,
      brand,
      memory,
      memoryType,
      interface,
      price,
      picture: cleanedPath,
    });

    try {
      const savedGPU = await newGPU.save();
      res.redirect(savedGPU.url);
    } catch (err) {
      // Handle error if GPU creation fails
      res.status(500).send("Failed to create GPU");
    }
  }),
];

// Display gpu delete form on GET.
exports.graphicscard_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const graphicsCard = await GraphicsCard.findById(req.params.id).exec();

  if (!graphicsCard) {
    res.redirect("/catalog/graphicscards"); // Redirect to a graphics card list page or handle as needed
    return;
  }

  res.render("graphicscard_delete", {
    title: "Delete Graphics Card",
    graphicsCard: graphicsCard,
  });
});

// Handle delete on POST for a specific GraphicsCard.
exports.graphicscard_delete_post = asyncHandler(async (req, res, next) => {
  try {
    const graphicsCardId = req.params.id;

    // Find the graphics card by ID and delete it
    const deletedGraphicsCard = await GraphicsCard.findByIdAndDelete(
      graphicsCardId
    );

    if (!deletedGraphicsCard) {
      // Handle case where graphics card wasn't found
      res.status(404).send("Graphics card not found");
      return;
    }

    // Graphics card deleted successfully
    res.redirect("/catalog/graphicscards"); // Redirect to the graphics card list
  } catch (error) {
    // Handle any error that occurred during the deletion process
    res.status(500).send("Error deleting graphics card");
  }
});

exports.graphicscard_update_get = asyncHandler(async (req, res, next) => {
  // Get graphicscard for form.
  const graphicscard = await Promise.all([
    GraphicsCard.findById(req.params.id).exec(),
  ]);

  res.render("graphicscard_form", {
    title: "Update Graphics Card",
    graphicscard: graphicscard,
  });
});

// Handle graphicscard update on POST.

exports.graphicscard_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Add validation and sanitization for other graphicscard fields as needed.
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const cleanedPath = req.file.path;
    // Create a graphicscard object with escaped/trimmed data and old id.
    const graphicscard = new GraphicsCard({
      name: req.body.name,
      brand: req.body.brand,
      memory: req.body.memory,
      memoryType: req.body.memoryType,
      interface: req.body.interface,
      price: req.body.price,
      picture: cleanedPath,
      _id: req.params.id, // Ensure to assign the correct graphicscard ID.
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("graphicscard_form", {
        title: "Update Graphics Card",
        graphicscard: graphicscard,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedGPU = await GraphicsCard.findByIdAndUpdate(
        req.params.id,
        graphicscard,
        {}
      );
      // Redirect to graphicscard detail page or appropriate URL.
      res.redirect(updatedGPU.url);
    }
  }),
];
