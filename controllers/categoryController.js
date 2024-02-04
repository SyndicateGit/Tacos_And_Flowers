const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");


//TODO: Implement the category_list controller method
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategory = await Category.find().sort({ name: 1 }).exec();
	res.render("category_list", {
		title: "Category List",
		category_list: allCategory,
	});
});

//TODO: Implement the category_create_get controller method
