const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

const cloudinary = require("../configs/cloudinaryConfig");

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().populate("category").sort({name:1}).exec();
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
exports.item_create_post = [
  body("name", "Item name of min 3 characters required")
  .trim()
  .isLength({ min: 3 })
  .escape(),
  body("description", "Item description of min 3 characters required")
  .trim()
  .isLength({ min: 3 })
  .escape(),
  body("price", "Price is required")
  .trim()
  .isNumeric()
  .escape(),
  body("category", "Category is required")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  
  asyncHandler(async (req, res, next) => {
    try{
      const errors = validationResult(req);

    let formattedPrice = parseFloat(req.body.price).toFixed(2);

    let item;
    
    // Image file is uploaded
    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path);

      item = new Item({
        name: req.body.name,
        category: req.body.category,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
        price: formattedPrice,
        description: req.body.description,
      });
    } 

    // Image file is not uploaded
    else {
      item = new Item({
        name: req.body.name,
        category: req.body.category,
        price: formattedPrice,
        description: req.body.description,
      });
    }

    // If there are errors, render the form again, passing the previously entered values and errors
    if (!errors.isEmpty()) {
      const categories = await Category.find().exec();
      res.render("item_form", {
        title: "Create Item",
        item: item,
        categories: categories,
        errors: errors.array(),
      });
      return;
    } else {
      await item.save();
      res.redirect(item.url);
    }
  } catch (err) {
    }
  }),
]

// Handle Item delete on GET.
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

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const currItem = await Item.findByIdAndDelete(req.params.id).exec();

  if (currItem && currItem.cloudinary_id) {
    await cloudinary.uploader.destroy(currItem.cloudinary_id);
  }

  res.redirect("/inventory/items");
});

// Handle Item update on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  const categories = await Category.find().exec();
  if (item == null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }
  res.render("item_form", {
    title: "Update Item",
    item: item,
    categories: categories,
  });
});

//TODO: Handle item update on POST.
exports.item_update_post = [
  body("name", "Item name of min 3 characters required")
  .trim()
  .isLength({ min: 3 })
  .escape(),
  body("description", "Item description of min 3 characters required")
  .trim()
  .isLength({ min: 3 })
  .escape(),
  body("price", "Price is required")
  .trim()
  .isNumeric()
  .escape(),
  body("category", "Category is required")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  
  asyncHandler(async (req, res, next) => {
    try{
      const errors = validationResult(req);

    let formattedPrice = parseFloat(req.body.price).toFixed(2);

    let item;
    
    // Image file is uploaded
    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path);

      item = new Item({
        name: req.body.name,
        category: req.body.category,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
        price: formattedPrice,
        description: req.body.description,
        _id: req.params.id,
      });
    } 

    // Image file is not uploaded
    else {
      item = new Item({
        name: req.body.name,
        category: req.body.category,
        price: formattedPrice,
        description: req.body.description,
        _id: req.params.id,
      });
    }

    // If there are errors, render the form again, passing the previously entered values and errors
    if (!errors.isEmpty()) {
      const categories = await Category.find().exec();
      res.render("item_form", {
        title: "Create Item",
        item: item,
        categories: categories,
        errors: errors.array(),
      });
      return;
    } else {

      //Fetch old item from db before update.
      const currItem = await Item.findByIdAndUpdate(req.params.id).exec();

      //Destroy old image in cloudinary if item has img.
      if(currItem && currItem.cloudinary_id){
        await cloudinary.uploader.destroy(currItem.cloudinary_id);
        console.log("Destroyed old image in cloudinary");
      }

      //Update item in db.
      await Item.findByIdAndUpdate(req.params.id, item).exec();
      res.redirect(item.url);
    }
  } catch (err) {
    console.log(err);
    }
  }),
]