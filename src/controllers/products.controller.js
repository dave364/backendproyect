import {productService} from "../services/index.js";

 const addProduct = async (req, res) => {
  const datos = req.body;
  const { name, price,category } = datos
  if (name && price && category ){
      await productService.addProduct(datos) 
      return res.send({status:"success"}) 
  }
  else {
      return res.send({status:"alguno de los campos no fue completado"}) 
  }
};


const getProducts = async (req, res) => {
  console.log(req.query)
  try {
    const { page, orderBy } = req.query;

    console.log("Page:", page);
    console.log("OrderBy:", orderBy);

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
  console.log()
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
