import { Router } from "express";
import ProductManagerMongo from "../dao/mongo/Managers/ProductsManagerMongo.js";
import CartsManagerMongo from "../dao/mongo/Managers/CartsManagerMongo.js";

const prod = new ProductManagerMongo();
const carrito = new CartsManagerMongo();
const router = Router();

router.get ('/as',async (req,res )=>{
    const product = await prod.getProducts();   
    res.render('home',{product,
        css:'home'})
})

router.get('/products', async (req,res) =>{
  const {page=1} = req.query;
  const {limit=10} = req.query
  const {sort} = req.query
  const {category} = req.query;
  const {status} = req.query;
  let sortAux;
  if (sort!==undefined){
    if (sort =="asc"){
      sortAux = 1;
   }
   else{
     if (sort=="des"){
       sortAux = -1;
     }    
   }
  }  
  
  const {docs,hasPrevPage,hasNextPage,prevPage,nextPage, ...rest} =  await prod.getProductsPaginate(page,limit,sortAux,category,status); 
  console.log(rest)
  const product = docs;  
  res.render('home',{product,hasPrevPage,hasNextPage,prevPage,nextPage,page:rest.page,limit,sort ,category,status, css:'home'})
})

router.get('/realtimeproducts', async (req,res)=>{       
    res.render('realTimeProducts',{
      css:'realtimeproducts'  
    });
})


router.get('/carts/:cid' , async (req,res) =>{
  const carritoId = await carrito.getCartsByID(req.params.cid).populate('products.product');;
  console.log(carritoId);
  res.render('home',{carritoId ,css:'home'})
})


export default router;