const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [200, "Name can not be more than 200 characters"],
    },
    img: {
      type: Array,
      default: ["https://semantic-ui.com/images/wireframe/image.png"],
    },
    for: {
      type: String,
      default: "UNISEX",
    },
    size: {
      type: String,
      default: "XS_XXL",
    },
    sizeList: {
      type: Array,
      default: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    colorList: { type: Array, default: ["black", "white"] },
    priceOriginal: {
      type: Number,
      required: [true, "Please provide product price original"],
    },
    priceLimited: { type: Number },
    desc: {
      type: String,
      maxlength: 200,
    },
    rating: {
      type: Number,
      default: 5,
    },
    review: {
      type: Number,
      default: 1,
    },
    overview: { type: Array },
    materials: { type: Array },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
