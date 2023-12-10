const GraphicsCard = require("../models/graphicscard");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder where the images will be stored
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Rename the file to avoid conflicts
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB (adjust as needed)
  },
  fileFilter: function (req, file, cb) {
    // Add logic to allow only specific file types (e.g., images)
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("File type not supported"), false);
    }
  },
}).single("image"); // 'image' should match the name attribute in your form input

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
  // Add middleware functions for form validation and sanitization using express-validator
  // ...

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        // Handle any multer-related errors here
        return res.status(400).send("Error uploading image.");
      }

      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        return res.render("graphicscard_form", {
          title: "Create GPU",
          graphicscard: req.body,
          errors: errors.array(),
        });
      }

      // If validation succeeds and the image is uploaded, create the GPU
      const { name, brand, memory, memoryType, interface, price } = req.body;
      const newGPU = new GraphicsCard({
        name,
        brand,
        memory,
        memoryType,
        interface,
        price,
        imagePath: req.file.path, // Save the image path to the database
      });

      try {
        const savedGPU = await newGPU.save();
        res.redirect(savedGPU.url);
      } catch (err) {
        // Handle error if GPU creation fails
        res.status(500).send("Failed to create GPU");
      }
    });
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

    // Create a graphicscard object with escaped/trimmed data and old id.
    const graphicscard = new GraphicsCard({
      name: req.body.name,
      brand: req.body.brand,
      memory: req.body.memory,
      memoryType: req.body.memoryType,
      interface: req.body.interface,
      price: req.body.price,
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
