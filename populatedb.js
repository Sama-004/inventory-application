#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const CPU = require("./models/cpu");
const GraphicsCard = require("./models/graphicscard");
const Motherboard = require("./models/motherboard");
const PowerSupply = require("./models/powersupply");
const RAM = require("./models/ram");

// const genres = [];
// const authors = [];
// const books = [];
// const bookinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCpus();
  await createGraphicsCards();
  await createMotherboards();
  await createPowerSupplies();
  await createRams();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function createCpus() {
  console.log("Adding cpu's");
  const cpus = [
    {
      name: "Intel i5 13500",
      brand: "Intel",
      socketType: "LGA1700",
      coreCount: 14,
      threadCount: 20,
      frequency: "4.80 GHz",
      price: 22169,
      // image: "cpu1.jpg",
    },
    {
      name: "Intel i5 12400f",
      brand: "Intel",
      socketType: "LGA1700",
      coreCount: 6,
      threadCount: 12,
      frequency: "4.40 GHz",
      price: 12599,
      // image: "cpu1.jpg",
    },
    {
      name: "AMD Ryzen™ 5 5600X",
      brand: "AMD Ryzen",
      socketType: "AM4",
      coreCount: 6,
      threadCount: 12,
      frequency: "4.60 GHz",
      price: 16499,
      // image: "cpu1.jpg",
    },
  ];

  await CPU.insertMany(cpus);
  console.log("CPUs added");
}
async function createGraphicsCards() {
  // Test data creation for Graphics Cards
  console.log("Adding GPU's");
  const gpus = [
    {
      name: "NVIDIA GeForce GTX 1650",
      brand: "NVIDIA",
      memory: "4 GB",
      memoryType: "GDDR5",
      interface: "PCIe 3.0 x16",
      price: 17435,
    },
    {
      name: "AMD Radeon™ RX 6600 XT",
      brand: "Ryzen",
      memory: "8 GB",
      memoryType: "GDDR6",
      interface: "PCIe 4.0 x8",
      price: 19760,
    },
    {
      name: "AMD Radeon™ RX 580",
      brand: "ASRock",
      memory: "8 GB",
      memoryType: "GDDR5",
      interface: "PCIe 3.0 x16",
      price: 12999,
    },
  ];
  await GraphicsCard.insertMany(gpus);
  console.log("GPUs added");
}

async function createMotherboards() {
  // Test data creation for Motherboards
  console.log("Adding Motherboards");
  const mbs = [
    {
      name: "B660 GAMING X DDR4",
      brand: "Gigabyte",
      socketType: "LGA1700",
      formFactor: "ATX",
      price: 17385,
    },
    {
      name: "B550M GAMING",
      brand: "Gigabyte",
      socketType: "AM4",
      formFactor: "Micro-ATX",
      price: 8960,
    },
    {
      name: "B760M Bomber WIFI Motherboard",
      brand: "MSI",
      socketType: "LGA1700",
      formFactor: "Micro-ATX",
      price: 11759,
    },
  ];
  await Motherboard.insertMany(mbs);
  console.log("Motherboards added");
}

async function createPowerSupplies() {
  // Test data creation for Power Supplies
  console.log("Adding PowerSupplies");
  const psus = [
    {
      name: "Cooler Master MWE 550 V2",
      brand: "Cooler Master",
      wattage: 550,
      efficiencyRating: "85% @ Typical Load",
      modular: false,
      price: 3699,
    },
    {
      name: "Adata XPG Core Reactor 750W",
      brand: "XPG",
      wattage: 750,
      efficiencyRating: "90% @ Typical Load",
      modular: true,
      price: 7040,
    },
    {
      name: "Deepcool DQ650-M-V2L 650W",
      brand: "Deepcool",
      wattage: 650,
      efficiencyRating: "90% @ Typical Load",
      modular: true,
      price: 3699,
    },
  ];
  await PowerSupply.insertMany(psus);
  console.log("PowerSupplies added");
}

async function createRams() {
  // Test data creation for RAM
  console.log("Adding RAMs");
  const rams = [
    {
      name: "Corsair Desktop Ram Vengeance Lpx Series 8GB ",
      brand: "Corsair",
      capacity: "8 GB",
      type: "DDR4",
      speed: "3200MHz",
      price: 1699,
    },
    {
      name: "Adata 8GB DDR5 4800MHz Memory",
      brand: "XPG",
      capacity: "8 GB",
      type: "DDR5",
      speed: "4800MHz",
      price: 2499,
    },
    {
      name: "Corsair Vengeance 16GB DDR5 C40 Memory",
      brand: "Corsair",
      capacity: "16 GB",
      type: "DDR5",
      speed: "5600MHz",
      price: 4399,
    },
  ];
  await RAM.insertMany(rams);
  console.log("RAMs added");
}
console.log("Process Ended");
