const express = require("express");
const router = express.Router();

// Require controller modules.
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const checkoutController = require("../controllers/checkoutController");

const cloudinary = require("../configs/cloudinaryConfig");

/// ITEM ROUTES ///

// GET items page.
router.get("/items", itemController.item_list);

// GET categories page.
router.get("/categories", categoryController.category_list);


// GET checkout page.
router.get("/checkout", checkoutController.checkout);

module.exports = router;
