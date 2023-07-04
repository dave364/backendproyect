import Cart from "../model/Cart.js";

export const deleteProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    // Buscar el carrito por su ID
    const cart = await Cart.findById(cartId);

    // Verificar si el carrito existe
    if (!cart) {
      return res.status(404).json({ message: "El carrito no existe" });
    }

    // Encontrar el producto en el carrito
    const product = cart.products.find((product) => product._id.toString() === productId);

    // Verificar si el producto existe en el carrito
    if (!product) {
      return res.status(404).json({ message: "El producto no existe en el carrito" });
    }

    // Restar 1 a la cantidad del producto en el carrito
    product.quantity -= 1;

    // Verificar si la cantidad llega a 0 y eliminar el producto completamente
    if (product.quantity === 0) {
      cart.products = cart.products.filter((product) => product._id.toString() !== productId);
    }

    // Guardar los cambios en el carrito
    await cart.save();

    res.json({ message: "Producto eliminado del carrito correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al eliminar el producto del carrito" });
  }
};
