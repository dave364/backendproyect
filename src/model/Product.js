import { mongoose, model, Schema } from "mongoose";
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

// Función para conectar a la base de datos
export const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://castrodavid9872:ItNaMTm4F5cwWs0v@cluster364da.jqgneo9.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error de conexión:', error);
  }
};


