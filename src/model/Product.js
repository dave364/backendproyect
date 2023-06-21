import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, unique: true, sparse: true },
  category: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

export default model("Product", ProductSchema);
