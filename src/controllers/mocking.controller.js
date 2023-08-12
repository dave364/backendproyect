import { generateProducts } from "../mocks/products.mock.js"

const getProductsMock = (req,res) =>{
    const products = []

    for (let i=0;i<100;i++){
        products.push(generateProducts())
    }
    
    res.send({status:"sucess",payload:products})
}


export default {getProductsMock} ;

