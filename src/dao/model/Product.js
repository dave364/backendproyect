import { model, Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

// Nombre de la colección de productos en la base de datos
export const productCollection = 'products';

const ProductSchema = new Schema({
  name: { type: String, unique: true, sparse: true },
  category: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

// Aplicación del plugin de paginación al esquema
ProductSchema.plugin(mongoosePaginate);

// Creación del modelo de producto utilizando el esquema
export const productModel = model('Product', ProductSchema);




