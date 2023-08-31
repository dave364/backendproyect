import TokenDTO from "../dtos/user/TokenDTO.js";
import {userService } from "../services/index.js";
import {generateToken} from "../middlewares/auth.js"
import RestoreTokenDTO from "../dtos/user/RestoreTokenDTO.js";
import DTemplates from "../constants/DTemplates.js";
import MailingService from "../services/MailingService.js";
import  jwt  from "jsonwebtoken";
import { createHash, validatePassword } from "../utils.js";
import config from "../config/config.js";

const register  = async(req,res)=>{
    
    res.send({status:"success",message:"Registered"});
}

const registerFall = (req,res)=>{
    res.status(400).json({status:"error",error:req.session.messages})
}

const login =async (req,res)=>{    
    // crea la session 
    req.logger.debug(req.user);


    req.session.user = new TokenDTO({name:req.user.name,email:req.user.email,role:req.user.role,id:req.user.id,cart:req.user.cart})   

        

     return res.status(200).send({status:"success",payload:req.session.user.name});
}

const logout = (req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send({status:'error',error:""})  
        res.redirect('/login');     
    })   
}


const loginFail = (req,res)=>{    
    
    if(req.session.messages){
        if(req.session.messages.length>4) return res.status(400).json({message:"bloquea los intentos ya ! "})    }
    
        res.status(400).json({status:"error",error:req.session.messages})
}

const githubcallback =(req,res)=>{
    console.log('GitHub callback called');
    const user = req.user;

    console.log('User object from GitHub:', user);

    req.session.user = {
        id:user.id,
        name:user.first_name,
        role:user.role,
        email:user.email
    }

    console.log('Usuario autenticado con Github:', user);
  res.redirect('/profile');
}

const current = (req,res)=>{
    const aux = req.session.user;
    console.log('Current user session data:', aux);
    return  res.send({status:"success",aux})
}

const changeRole = async (req,res)=>{

    const idAux = req.params.uid;
    console.log(idAux)
    const aux = await userService.changeRole(idAux) 
    return  res.send({status:"success",aux})
}

const restoreRequest = async (req,res) =>{
    const {email} = req.body;
    if (!email) return res.send({status:"error"}) // no se proporciono un email
    const user = await userService.getUser({email})
    if (!user) return res.send({status:error}) // email no valido

    // ahora restaurar 
    
    const restoreToken = generateToken(RestoreTokenDTO.getFrom(user),"10m")    
    const mailingService = new MailingService()      
    const result = await mailingService.sendMail(user.email,DTemplates.RESTORE,{restoreToken})    
    return res.send({status:"success"})
    
}

const restorePassword = async (req,res) =>{
    const {password,token} = req.body;
    try{
        const tokenUser= jwt.verify(token,config.jwt.SECRET);
        const user = await userService.getUser({email: tokenUser.email})
        if (!user) {
            // Usuario no encontrado
            return res.render('invalidToken');
        }
        //verificar que la contraseña no sea la misma que ya tenemos 
        console.log(password)
        console.log(user)
        const isSamePassword = await validatePassword(password,user.password)
        console.log(isSamePassword)        
        if (isSamePassword){
            return res.send({status:"error" , message:"la contraseña es la misma"}) // la contraseña es la misma
        }
        const newHashedPassword = await createHash(password)
        await userService.updateUser(user._id,{password:newHashedPassword})
        return  res.send({status:"success" ,message:"se cambio la contrseña"})
        
    }
    catch(error){
        console.log(error)
    }
}

const getUserAllDTO = async (req,res) =>{
    const users = await userService.getUserAll();
    const userDTO = users.map( user =>  new TokenDTO(user) )   
    return res.send({status:"success",payload:userDTO})
}

const deleteUser = async (req,res) =>{
    const idAux = req.params.uid;
    const deleteUser = await userService.deleteUser(idAux)
    return res.send({status:"success",message:"user borrado"})

}

export default {    
    register,
    registerFall,
    login,
    logout,
    loginFail,
    githubcallback,
    current,
    changeRole,
    restoreRequest,
    restorePassword,
    getUserAllDTO,
    deleteUser
}