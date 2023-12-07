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
// Display CPU delete form on GET.
exports.cpu_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU delete GET");
});

// Handle CPU delete on POST.
exports.cpu_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU delete POST");
});

// Display CPU update form on GET.
exports.cpu_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU update GET");
});

// Handle CPU update on POST.
exports.cpu_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CPU update POST");
});
