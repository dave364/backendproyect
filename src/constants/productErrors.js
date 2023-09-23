export const productErrorIncompleteValues = (product) =>{
    return `Uno o más parámetros obligatorios no fueron proporcionados:
    Propiedades obligatorias:
    * title: se esperaba una cadena definida, y se recibió ${product.title};
    * description: se esperaba una cadena definida, y se recibió ${product.description};
    * price: se esperaba una cadena definida, y se recibió ${product.price};
    * thumbnail: se esperaba una cadena definida, y se recibió ${product.thumbnail}; 
    * code: se esperaba una cadena definida, y se recibió ${product.code};
    * stock: se esperaba una cadena definida, y se recibió ${product.stock};
    * category: se esperaba una cadena definida, y se recibió ${product.category};
    * status: se esperaba una cadena definida, y se recibió ${product.status};   
    `
}

export const productErrorNoExist = (product) =>{
    return `
            el id del producto no existe en la DB
        `
}