import Cart from "../model/Cart.js";
import { productModel } from "../model/Product.js";

export const addProductCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    // Verificar si el carrito existe
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ mensaje: "El carrito no existe" });
    }

    // Verificar si el producto existe
    const product = await productModel.findById(pid);
    if (!product) {
      return res.status(404).json({ mensaje: "El producto no existe" });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(
      (item) => item.product.toString() === pid
    );

    // Si el producto ya está en el carrito, incrementar la cantidad
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({ product: pid, quantity: 1 });
    }

    // Guardar el carrito actualizado en la base de datos
    await cart.save();

    res.json({
      mensaje: "El producto fue agregado al carrito",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar el producto al carrito" });
  }
};
