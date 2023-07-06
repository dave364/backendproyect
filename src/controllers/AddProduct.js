import { productModel } from "../model/Product.js";


export const addProduct = async (req, res) => {
  console.log("addProduct")
  const { name, category, price } = req.body;

  try {
    // Crear una instancia del modelo de Producto con los datos proporcionados
    const newProduct = new productModel({ name, category, price });

    // Guardar el nuevo producto en la base de datos
    const savedProduct = await newProduct.save();

    res.json({
      mensaje: "El producto fue agregado exitosamente",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar el producto",
      error: error.message,
    });
  }
};
