const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {type: String, required: true, minLength: 2},
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  // cloudinary_id: {type: String},
  price: {type: Schema.Types.Decimal128, required: true},
  description: {type: String, required: true, maxLength: 300},
});

itemSchema.virtual("url").get(function(){
  return `/inventory/items/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);