const Category = require("../models/category");

const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

// Display Categories page on GET.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategory = await Category.find().sort({ name: 1 }).exec();
	res.render("category_list", {
		title: "Category List",
		category_list: allCategory,
	});
});

//TODO: Implement the category_detail controller method
//Display detail page for a items from a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
	const category = await Category.findById(req.params.id).exec();

	const allItemsOfCategory = await Item.find({ category: req.params.id }).exec();

	if (category == null) {
		const err = new Error("Category not found");
		err.status = 404;
		return next(err);
	}
	res.render("category_detail", {
		title: "Category Detail",
		category: category,
		category_items: allItemsOfCategory,
	});
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
	res.render("category_form", {
		title: "Create Category",
	});
});

//TODO: Implement the category_create_post controller method