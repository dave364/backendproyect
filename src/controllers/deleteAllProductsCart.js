import Cart from "../model/Cart.js";

export const deleteAllProductsFromCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    // Buscar el carrito por su ID
    const cart = await Cart.findById(cartId);

    // Verificar si el carrito existe
    if (!cart) {
      return res.status(404).json({ message: "El carrito no existe" });
    }

    // Eliminar todos los productos del carrito
    cart.products = [];

    // Guardar los cambios en el carrito
    await cart.save();

    res.json({ message: "Todos los productos han sido eliminados del carrito" });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al eliminar los productos del carrito" });
  }
};