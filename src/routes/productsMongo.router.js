import {Router} from 'express'
import ProductManagerMongo from '../dao/mongo/Managers/ProductsManagerMongo.js';


const prod = new ProductManagerMongo();
const router = Router();

router.get('/',async (req,res)=>{
    try{
    let {page=1} = req.query;
    let {limit=10} = req.query
    let {sort} = req.query
    let {category} = req.query;
    let {status} = req.query;
    let sortAux;
    if (sort!==undefined){
      if (sort =="asc"){
        sortAux = 1;
     }
     else{
       if (sort=="desc"){
         sortAux = -1;
       }    
     }
    }  
    const {docs,hasPrevPage,hasNextPage,prevPage,nextPage, ...rest} =  await prod.getProductsPaginate(page,limit,sortAux,category,status); 
    console.log(rest)
    const product = docs;  
    let prevLink;
    let nextLink;
    if (limit==undefined){
        limit="";
    }
    if (sort==undefined){
        sort="";
    }
    if (category==undefined){
        category="";
    }
    if (status==undefined){
        status="";
    }
    if (hasPrevPage==false){
        prevLink =null;
    }
    else {
       
        prevLink =`/?page=${prevPage}&&limit=${limit}&&sort=${sort}&&category=${category}&&status=${status}`;
    }
    if (hasNextPage==false){
        nextLink=null;
    }
    else {
        nextLink= `/?page=${nextPage}&&limit=${limit}&&sort=${sort}&&category=${category}&&status=${status}`;
    }

    res.send({status:"success",payload:product,totalpage:rest.totalPages,prevPage,nextPage,page:rest.page,hasPrevPage,hasNextPage,prevLink,nextLink})
    }
    catch{
        return { status: 'error', message: "Error en getAll MongoDB: " + error, value: null}
    }
    
})

router.get('/:pid',async (req,res)=>{  

   const aux = await prod.getProductsByID(req.params.pid);
   if (!aux){
    return res.send("no existe el producto")
   }

    return res.send(aux)

})

router.post('/',async (req,res)=>{    
    const datos = req.body;
    const { title, description, price, thumbnail=[], code, stock,category, status } = datos
    if (title && description && price && status && code && stock && category ){
        await prod.createProduct(datos) 
        return res.send({status:"success"}) 
    }
    else {
        return res.send({status:"alguno de los campos no fue completado"}) 
    }
})


router.put('/:pid', async (req,res)=>{    
    const idAux = req.params.pid;
    const datos = req.body; 
    const aux = await prod.updateProduct(idAux,datos)     
    if (!aux){
        return res.send("no existe el producto a modificar")
    }   
    res.send({status:"success"})   

})

router.delete('/:pid', async (req,res)=>{
    const idAux = req.params.pid;
    const borrado = await prod.deleteProduct(idAux)    
    console.log()
    if (!borrado)  {
        return res.send({status:" no success"})
    }
    return res.send({status:"si success"})

})






export default router;