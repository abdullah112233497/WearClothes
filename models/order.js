// models/Order.js
import mongoose from "mongoose";

// Define the schema
const OrderSchema = new mongoose.Schema({
userID:{ type:String, required:true},
products:[
    { productId:{type:String, required:true},
        quantity:{type:Number, default:1},}
        ],
        address:{type:String,required:true},
        amount:{type:Number,required:true},
        status:{type:String,default:"pending",required:true}
},{timestamps:true});

// Export the model
// Check if the model already exists to avoid recompilation errors in Next.js hot reload
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
