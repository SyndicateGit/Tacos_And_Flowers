const mongoose = require("mongoose");

// Create Schema
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
   name: {type: String, required: true},
   description: {type: String, required: true, maxLength: 200 },
})

CategorySchema.virtual('url').get(function () {
   return `/inventory/categories/${this._id}`;
})

// Export model
module.exports = mongoose.model("Category", CategorySchema);