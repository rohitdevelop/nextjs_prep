import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
  },
  { timestamps: true } // <-- typo fixed: "timestamps"
);

// Avoid recompiling model if already exists
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
