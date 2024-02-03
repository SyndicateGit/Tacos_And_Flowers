const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

//TODO: Implement the item_list controller method
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().populate("category").sort({name:1}).exec();
  console.log(allItems);
  res.render("item_list", { title: "Item List" , item_list: allItems}, );
});