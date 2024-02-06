const Checkout = require("../models/checkout");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

//TODO: Implement checkout page.
//Am thinking of rick roll for now lol
exports.checkout = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category List");
});
