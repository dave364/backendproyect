import { model, Schema } from "mongoose";

const CartSchema = new Schema({
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
});

export default model("Cart", CartSchema);
