const GraphicsCard = require("../models/graphicscard");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
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
  // Validate and sanitize fields
  body("name", "Graphics Card name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // Add more validations for other fields if necessary

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a graphics card object with escaped and trimmed data.
    const newGraphicsCard = new GraphicsCard({ name: req.body.name });
    // Add other fields based on your schema

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("graphicscard_form", {
        title: "Create Graphics Card",
        graphicscard: newGraphicsCard,
        errors: errors.array(),
      });
      return;
    } else {
      try {
        // Save the new graphics card
        await newGraphicsCard.save();
        // Redirect to the newly created graphics card's detail page
        res.redirect(newGraphicsCard.url);
      } catch (err) {
        // Handle any error that occurs during saving the graphics card
        return next(err);
      }
    }
  }),
];

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
