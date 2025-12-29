// import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

// const ProductSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true , unique:true},
//     desc: { type: String, required: true },
//     img: { type: String, required: true },
//     category: { type: String, required: true },
//     size: { type: String },
//     color: { type: String },
//     price: { type: Number },
//     availableQty: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Product ||
//   mongoose.model("Product", ProductSchema);

import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  qty: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },

    // ✅ REAL SOLUTION
    variants: [VariantSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
