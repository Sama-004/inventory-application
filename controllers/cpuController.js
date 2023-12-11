const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const cpu = require("../models/cpu");
const GraphicsCard = require("../models/graphicscard");
const Motherboard = require("../models/motherboard");
const PowerSupply = require("../models/powersupply");
const ram = require("../models/ram");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [numCpus, numGraphiccards, numMotherboards, numPowersupplies, numRams] =
    await Promise.all([
      cpu.countDocuments({}).exec(),
      GraphicsCard.countDocuments({}).exec(),
      Motherboard.countDocuments({}).exec(),
      PowerSupply.countDocuments({}).exec(),
      ram.countDocuments({}).exec(),
    ]);

  res.render("index", {
    title: "Pc Parts Catalog Home",
    cpu_count: numCpus,
    gpu_count: numGraphiccards,
    motherboard_count: numMotherboards,
    power_supply_count: numPowersupplies,
    ram_count: numRams,
  });
});

// Display list of all CPUs.
exports.cpu_list = asyncHandler(async (req, res, next) => {
  const allCpu = await cpu
    .find({}, "brand name")
    .sort({ brand: 1 })
    .populate("name")
    .exec();

  res.render("cpu_list", { title: "Cpu List", cpu_list: allCpu });
});

// Display detail page for a specific CPU.
exports.cpu_detail = asyncHandler(async (req, res, next) => {
  const cpuId = req.params.id;

  try {
    const foundCPU = await cpu.findById(cpuId);

    if (!foundCPU) {
      // If CPU is not found, return an error or render a not found page
      return res.status(404).send("CPU not found");
    }

    // Render the CPU detail view and pass the CPU data to it
    res.render("cpu_detail", { title: "CPU Detail", cpu: foundCPU });
  } catch (err) {
    // Handle other errors that might occur during database interaction
    res.status(500).send("Internal Server Error");
  }
});

// Display CPU create form on GET.
exports.cpu_create_get = (req, res, next) => {
  res.render("cpu_form", { title: "Create Cpu" });
};

exports.cpu_create_post = [
  // Validate and sanitize fields.
  body("name", "CPU name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const cleanedPath = req.file.path;
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.render("cpu_form", {
        title: "Create CPU",
        cpu: req.body,
        errors: errors.array(),
      });
    }

    const {
      name,
      brand,
      socketType,
      coreCount,
      threadCount,
      frequency,
      price,
    } = req.body;
    const newCPU = new cpu({
      name,
      brand,
      socketType,
      coreCount,
      threadCount,
      frequency,
      price,
      picture: cleanedPath,
    });

    try {
      const savedCPU = await newCPU.save();
      res.redirect(savedCPU.url);
    } catch (err) {
      // Handle error if CPU creation fails
      res.status(500).send("Failed to create CPU");
    }
  }),
];

// Display cpu delete form on GET.
exports.cpu_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of cpu
  const CPU = await cpu.findById(req.params.id).exec();

  if (!CPU) {
    res.redirect("/catalog/cpus"); // Redirect to a cpu list page or handle as needed
    return;
  }

  res.render("cpu_delete", {
    title: "Delete Cpu ",
    CPU: CPU,
  });
});

// Handle delete on POST for a Cpu.
exports.cpu_delete_post = asyncHandler(async (req, res, next) => {
  const cpuId = req.params.id;
  try {
    // Find the CPU by ID and delete it
    const deletedCpu = await cpu.findByIdAndDelete(cpuId);

    if (!deletedCpu) {
      // Handle case where cpu wasn't found
      res.status(404).send("Cpu not found");
      return;
    }

    //CPU deleted successfully
    res.redirect("/catalog/cpus"); // Redirect to the Cpu list
  } catch (error) {
    // Handle any error that occurred during the deletion process
    res.status(500).send("Error deleting CPU");
  }
});

exports.cpu_update_get = asyncHandler(async (req, res, next) => {
  // Get cpu for form.
  const CPU = await Promise.all([cpu.findById(req.params.id).exec()]);

  res.render("cpu_form", {
    title: "Update CPU",
    CPU: CPU,
  });
});

// Handle cpu update on POST.

exports.cpu_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Add validation and sanitization for other cpu fields as needed.
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a cpu object with escaped/trimmed data and old id.
    const CPU = new cpu({
      name: req.body.name,
      brand: req.body.brand,
      socketType: req.body.socketType,
      coreCount: req.body.coreCount,
      threadCount: req.body.threadCount,
      frequency: req.body.frequency,
      price: req.body.price,
      _id: req.params.id, // Ensure to assign the correct cpu ID.
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("cpu_form", {
        title: "Update CPU",
        CPU: CPU,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedCPU = await cpu.findByIdAndUpdate(req.params.id, CPU, {});
      // Redirect to graphicscard detail page or appropriate URL.
      res.redirect(updatedCPU.url);
    }
  }),
];
