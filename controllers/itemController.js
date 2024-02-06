const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

const cloudinary = require("../configs/cloudinaryConfig");

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().populate("category").sort({name:1}).exec();
  console.log(allItems);
  res.render("item_list", { title: "Item List" , items: allItems}, );
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();
  res.render("item_form", {
    title: "Create Item",
    categories: categories,
  });
});

// Handle Item create on POST.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  if (item == null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }
  res.render("item_detail", {
    title: "Item Detail",
    item: item,
  });
});

// Handle Item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.render("Not Implemented: Item Create Post");
});

//TODO add item_delete_get controller
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  if (item == null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }
  res.render("item_delete", {
    title: "Delete Item",
    item: item,
  });
});

//TODO add item_delete_post controller
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.render("Not Implemented: Item Delete Post");
});