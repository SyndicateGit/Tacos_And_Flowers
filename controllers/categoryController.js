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

//Handle Category create on POST.
exports.category_create_post = [
	body("name", "Category name of min 3 characters required")
		.trim()
		.isLength({ min: 3 })
		.escape(),
	body("description", "Category description of min 3 characters required")
		.trim()
		.isLength({ min: 3 })
		.escape(),

	asyncHandler (async(req, res, next) => {

		const errors = validationResult(req);

		const category = new Category({ name: req.body.name, description: req.body.description});

		if (!errors.isEmpty()) {
			res.render("category_form", {
				title: "Create Category",
				category: category,
				errors: errors.array(),
			});
			return;
		} else {
			const categoryExists = await Category.findOne({ name: req.body.name }).exec();

			if (categoryExists) {
				res.redirect(categoryExists.url);
			} else {
				await category.save();
					
				res.redirect(category.url);
			};
		}
	}),
];


// Handler for category delete on GET.

exports.category_delete_get = asyncHandler(async (req, res, next) => {
	const [category, allItemsOfCategory] = await Promise.all([Category.findById(req.params.id), Item.find({ category: req.params.id })]);

	if(category == null) {
		// No results.
		res.redirect("/inventory/categories");
		return;
	} else {
		res.render("category_delete", {
			title: "Delete Category",
			category: category,
			category_items: allItemsOfCategory,
		});
	}
});

// Handler for category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
	const [category, allItemsOfCategory] = await Promise.all([Category.findById(req.params.id), Item.find({ category: req.params.id })]);

	if (allItemsOfCategory.length > 0) {
		res.render("category_delete", {
			title: "Delete Category",
			category: category,
			category_items: allItemsOfCategory,
		});
		return;
	} else {
		await Category.findByIdAndDelete(req.params.id);
		res.redirect("/inventory/categories");
	}
});


exports.category_update_get = asyncHandler(async (req, res, next) => {
	const category = await Category.findById(req.params.id).exec();

	if(category === null){
		const err = new Error("Category not found.");
		err.status = 404;
		return next(err);
	}

	res.render("category_form",{
		title: "Update Category",
		category: category,
	});
});


//TODO: Handle category update on POST.
exports.category_update_post = [
	body("name", "Category name of min 3 characters required").trim().isLength({ min: 3 }).escape(),
	body("description", "Category description of min 3 characters required").trim().isLength({ min: 3 }).escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const category = new Category({ name: req.body.name, description: req.body.description, _id: req.params.id });

		if (!errors.isEmpty()) {
			res.render("category_form", {
				title: "Update Category",
				category: category,
				errors: errors.array(),
			});
			return;
		} else {
			await Category.findByIdAndUpdate(req.params.id, category).exec();
			res.redirect(category.url);
		}
	}),
]
