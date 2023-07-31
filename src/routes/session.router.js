import {Router} from "express"
//import userModel from "../dao/model/user.js";
import UserManagerMongo from "../dao/controllers/UserManagerMongo.js";
import { privacy , handlePolicies} from "../middlewares/auth.js";
//import { createHash, validatePassword } from "../utils.js";
import passport from "passport";


const router = Router();

const user = new UserManagerMongo();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFall',failureMessage:true}),async(req,res)=>{
          

    console.log(req.message)
    res.send({status:"success",message:"Registered"});
})

router.get('/registerFall',(req,res)=>{
    res.status(400).json({status:"error",error:req.session.messages})
})
    
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail' ,failureMessage:true}),async (req,res)=>{

   
    
    // crea la session 
    req.session.user = {
        name: req.user.name,
        email: req.user.email,   
        role:req.user.role,
        id:req.user.id     
     }   
    
    
     return res.status(200).send({status:"success",payload:"Credenciales Correctas"});
  

})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send({status:'error',error:""})  
        res.redirect('/login');     
    })
   
})

router.get('/loginFail',(req,res)=>{    
    
    if(req.session.messages){
        if(req.session.messages.length>4) return res.status(400).json({message:"bloquea los intentos ya ! "})    }
    
        res.status(400).json({status:"error",error:req.session.messages})
})

router.get('/github',passport.authenticate('github'),(req,res)=>{

})
router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    const user = req.user;

    req.session.user = {
        id:user.id,
        name:user.first_name,
        role:user.role,
        email:user.email
    }
    console.log('Usuario autenticado con Github:', user);
    res.redirect('/profile');
   
})

router.get('/current',privacy('PRIVATED'),handlePolicies(['USER']),(req,res)=>{
    const aux = req.session.user;
    return  res.send({status:"success",aux})
})

export default router;