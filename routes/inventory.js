const express = require("express");
const router = express.Router();

// Require controller modules.
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const checkoutController = require("../controllers/checkoutController");

/// ITEM ROUTES ///

// GET inventory page.
router.get("/inventory/items", itemController.item_list);