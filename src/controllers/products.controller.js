import {productService} from "../services/index.js";
import ErrorService from "../services/ErrorService.js";
import {productErrorIncompleteValues} from "../constants/productErrors.js"
import EErrors from "../constants/EErrors.js";
import { tr } from "@faker-js/faker";

 const addProduct = async (req, res, next) => {
  try {
  const datos = req.body;
  const { name, price,category } = datos
  if (name && price && category ){
      await productService.addProduct(datos) 
      return res.send({status:"success"}) 
  }
  else {
    ErrorService.createError({
        name:"Error de creación de producto",
        cause: productErrorIncompleteValues({title,price,category}),
        message: 'Error intentando insertar un nuevo producto',
        code: EErrors.INCOMPLETE_VALUES,
        status:400
    })
           
    return res.send({status:"alguno de los campos no fue completado"}) 
}
} catch (error) {
    req.logger.error(error);
    next(error);
} 

}


const getProducts = async (req, res) => {
  console.log(req.query)
  try {
    const { page, orderBy } = req.query;


    const result = await productService.getProducts(page, orderBy);
    res.json(result);
  } catch (error) {
    console.error("Error al leer los productos:", error);
    res.status(500).json({
      status: "error",
      message: "Error al leer los productos",
    });
  }
};

 const getProductsByID = async (req,res) =>{
  const aux = await productService.getProductsByID(req.params.pid);
 if (!aux){
  return res.send("no existe el producto")
 }

  return res.send(aux)
}

const updateProduct =  async (req,res)=>{    
  const idAux = req.params.pid;
  const datos =  req.body;
  const aux = await productService.updateProduct(idAux,datos)     
  if (!aux){
      return res.send("no existe el producto a modificar")
  }   
  res.send({status:"success"})   

}

const deleteProduct =  async (req,res)=>{
  const idAux = req.params.pid;
  const borrado = await productService.deleteProduct(idAux)    
  if (!borrado)  {
      return res.send({status:" no success"})
  }
  return res.send({status:"si success"})

}

export default {
  addProduct,
  getProducts,
  getProductsByID,
  updateProduct,
  deleteProduct
};
