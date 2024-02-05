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
router.get("/items/create", itemController.item_create_get);
router.get("/items/:id", itemController.item_detail);

// GET categories page.
router.get("/categories", categoryController.category_list);
router.get("/categories/create", categoryController.category_create_get);

router.get("/categories/:id", categoryController.category_detail);

// POST categories page.
router.post("/categories/create", categoryController.category_create_post);

// GET checkout page.
router.get("/checkout", checkoutController.checkout);

module.exports = router;
