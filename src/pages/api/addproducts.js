import connectDB from "../../../middleware/db";
import Product from "../../../models/products";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { slug, title, desc, img, category, size, color, price, availableQty } = req.body;

    try {
      const existingProduct = await Product.findOne({ slug });
      if (existingProduct) {
        return res.status(400).json({ message: "Product with this slug already exists" });
      }

      const newProduct = new Product({
        title,
        slug,
        desc,
        img,
        category,
        size,
        color,
        price,
        availableQty,
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default connectDB(handler);
