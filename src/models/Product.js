import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    info: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // ✅ Store Cloudinary URL here
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
