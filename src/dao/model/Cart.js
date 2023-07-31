import { model, Schema } from "mongoose";

const CartSchema = new Schema({
  products: [{
    name: { type: String, unique: true, sparse: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
});

export const cartModel = model("Cart", CartSchema);
