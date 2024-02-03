const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Checkout", checkoutSchema);