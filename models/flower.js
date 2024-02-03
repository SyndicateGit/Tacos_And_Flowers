const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flowerSchema = new Schema({
  name: {type: String, required: true, minLength: 2},
  // cloudinary_id: {type: String},
  price: {type: Schema.Types.Decimal128, required: true},
  description: {type: String, required: true, maxLength: 300},
});

flowerSchema.virtual("url").get(function(){
  return `/inventory/items/${this._id}`;
});

module.exports = mongoose.model("flower", flowerSchema);