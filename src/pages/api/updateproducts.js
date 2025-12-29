// pages/api/saveproducts.js
import connectDB from "../../../middleware/db";
import Product from "../../../models/products";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const products = req.body; // Array of products

      const results = [];

      for (let prod of products) {
        if (prod._id) {
          // Update existing product by _id
          const updated = await Product.findByIdAndUpdate(
            prod._id,
            { $set: prod },
            { new: true, runValidators: true }
          );
          results.push(updated);
        } else {
          // Create new product if no _id
          const newProduct = new Product(prod);
          const saved = await newProduct.save();
          results.push(saved);
        }
      }

      res.status(200).json({ success: true, products: results });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
