const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

// Require controller modules.
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const checkoutController = require("../controllers/checkoutController");

const cloudinary = require("../configs/cloudinaryConfig");

/// ITEM ROUTES ///


// GET Item pages.
router.get("/items", itemController.item_list);
router.get("/items/create", itemController.item_create_get);
router.get("/items/:id", itemController.item_detail);
router.get("/items/:id/delete", itemController.item_delete_get);
router.get("/items/:id/update", itemController.item_update_get);

// POST Item pages.
router.post("/items/create", upload.single("uploaded_file"), itemController.item_create_post);
router.post("/items/:id/delete", itemController.item_delete_post);
router.post("/items/:id/update", upload.single("uploaded_file"), itemController.item_update_post);

// GET categories page.
router.get("/categories", categoryController.category_list);
router.get("/categories/create", categoryController.category_create_get);
router.get("/categories/:id", categoryController.category_detail);
router.get("/categories/:id/delete", categoryController.category_delete_get);
router.get("/categories/:id/update", categoryController.category_update_get);

// POST categories page.
router.post("/categories/create", categoryController.category_create_post);
router.post("/categories/:id/delete", categoryController.category_delete_post);
router.post("/categories/:id/update", categoryController.category_update_post);

// GET checkout page.
router.get("/checkout", checkoutController.checkout);

module.exports = router;
