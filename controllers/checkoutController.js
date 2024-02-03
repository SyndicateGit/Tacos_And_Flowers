const Checkout = require("../models/checkout");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.checkout = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category List");
});
