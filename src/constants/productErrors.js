export const productErrorIncompleteValues = (product) =>{
    return `Uno o más parámetros obligatorios no fueron proporcionados:
    Propiedades obligatorias:
    * name: se esperaba una cadena definida, y se recibió ${product.name};
    * price: se esperaba una cadena definida, y se recibió ${product.price};
    * category: se esperaba una cadena definida, y se recibió ${product.category};  
    `
}

export const productErrorNoExist = (product) =>{
    return `
            el id del producto no existe en la DB
        `
}