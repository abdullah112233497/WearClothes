import  connectDB  from "../../../middleware/db";
import Product from "../../../models/products";

const handler=async (req,res)=>{

  let products=await Product.find()
  res.status(200).json({products})
}
export default connectDB(handler)