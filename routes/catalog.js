const express = require("express");
const router = express.Router();

// Require controller modules.
const cpu_controller = require("../controllers/cpuController");
const graphicsCard_controller = require("../controllers/graphicscardController");
const motherboard_controller = require("../controllers/motherboardController");
const powerSupply_controller = require("../controllers/powersupplyController");
const ram_controller = require("../controllers/ramController");

/// CPU ROUTES ///

// GET catalog home page.
router.get("/", (req, res) => {
  res.send("Welcome to the PC Parts Catalog");
});

// GET request for creating a CPU. NOTE This must come before routes that display CPU (uses id).
router.get("/cpu/create", cpu_controller.cpu_create_get);

// POST request for creating CPU.
router.post("/cpu/create", cpu_controller.cpu_create_post);

// GET request to delete CPU.
router.get("/cpu/:id/delete", cpu_controller.cpu_delete_get);

// POST request to delete CPU.
router.post("/cpu/:id/delete", cpu_controller.cpu_delete_post);

// GET request to update CPU.
router.get("/cpu/:id/update", cpu_controller.cpu_update_get);

// POST request to update CPU.
router.post("/cpu/:id/update", cpu_controller.cpu_update_post);

// GET request for one CPU.
router.get("/cpu/:id", cpu_controller.cpu_detail);

// GET request for list of all CPU items.
router.get("/cpus", cpu_controller.cpu_list);

/// GPU ROUTES ///

// GET request for creating GPU. NOTE This must come before route for id (i.e. display GPU).
router.get(
  "/graphicscard/create",
  graphicsCard_controller.graphicscard_create_get
);

// POST request for creating GPU.
router.post(
  "/graphicscard/create",
  graphicsCard_controller.graphicscard_create_post
);

// GET request to delete GPU.
router.get(
  "/graphicscard/:id/delete",
  graphicsCard_controller.graphicscard_delete_get
);

// POST request to delete GPU.
router.post(
  "/graphicscard/:id/delete",
  graphicsCard_controller.graphicscard_delete_post
);

// GET request to update GPU.
router.get(
  "/graphicscard/:id/update",
  graphicsCard_controller.graphicscard_update_get
);

// POST request to update GPU.
router.post(
  "/graphicscard/:id/update",
  graphicsCard_controller.graphicscard_update_post
);

// GET request for one GPU.
router.get("/graphicscard/:id", graphicsCard_controller.graphicscard_detail);

// GET request for list of all GPUs.
router.get("/graphicscards", graphicsCard_controller.graphicscard_list);

/// Motherboard ROUTES ///

// GET request for creating a Motherboard. NOTE This must come before route that displays Motherboard (uses id).
router.get(
  "/motherboard/create",
  motherboard_controller.motherboard_create_get
);

//POST request for creating Motherboard.
router.post(
  "/motherboard/create",
  motherboard_controller.motherboard_create_post
);

// GET request to delete Motherboard.
router.get(
  "/motherboard/:id/delete",
  motherboard_controller.motherboard_delete_get
);

// POST request to delete Motherboard.
router.post(
  "/motherboard/:id/delete",
  motherboard_controller.motherboard_delete_post
);

// GET request to update Motherboard.
router.get(
  "/motherboard/:id/update",
  motherboard_controller.motherboard_update_get
);

// POST request to update Motherboard.
router.post(
  "/motherboard/:id/update",
  motherboard_controller.motherboard_update_post
);

// GET request for one Motherboard.
router.get("/motherboard/:id", motherboard_controller.motherboard_detail);

// GET request for list of all Motherboard.
router.get("/motherboards", motherboard_controller.motherboard_list);

/// PowerSupply ROUTES ///

// GET request for creating a PowerSupply. NOTE This must come before route that displays PowerSupply (uses id).
router.get(
  "/powersupply/create",
  powerSupply_controller.powersupply_create_get
);

// POST request for creating PowerSupply.
router.post(
  "/powersupply/create",
  powerSupply_controller.powersupply_create_post
);

// GET request to delete PowerSupply.
router.get(
  "/powersupply/:id/delete",
  powerSupply_controller.powersupply_delete_get
);

// POST request to delete PowerSupply.
router.post(
  "/powersupply/:id/delete",
  powerSupply_controller.powersupply_delete_post
);

// GET request to update PowerSupply.
router.get(
  "/powersupply/:id/update",
  powerSupply_controller.powersupply_update_get
);

// POST request to update PowerSupply.
router.post(
  "/powersupply/:id/update",
  powerSupply_controller.powersupply_update_post
);

// GET request for one PowerSupply.
router.get("/powersupply/:id", powerSupply_controller.powersupply_detail);

// GET request for list of all PowerSupply.
router.get("/powersupplies", powerSupply_controller.powersupply_list);

/// RAM ROUTES ///

// GET request for creating a RAM. NOTE This must come before route that displays RAM (uses id).
router.get("/ram/create", ram_controller.ram_create_get);

// POST request for creating RAM.
router.post("/ram/create", ram_controller.ram_create_post);

// GET request to delete RAM.
router.get("/ram/:id/delete", ram_controller.ram_delete_get);

// POST request to delete RAM.
router.post("/ram/:id/delete", ram_controller.ram_delete_post);

// GET request to update RAM.
router.get("/ram/:id/update", ram_controller.ram_update_get);

// POST request to update RAM.
router.post("/ram/:id/update", ram_controller.ram_update_post);

// GET request for one RAM.
router.get("/ram/:id", ram_controller.ram_detail);

// GET request for list of all RAM.
router.get("/rams", ram_controller.ram_list);

module.exports = router;
