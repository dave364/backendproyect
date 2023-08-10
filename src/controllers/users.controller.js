import TokenDTO from "../dtos/user/TokenDTO.js";

const register = async(req,res)=>{
          

  console.log(req.message)
  res.send({status:"success",message:"Registered"});
}

const registerFall = (req,res)=>{
  res.status(400).json({status:"error",error:req.session.messages})
}
  
const login = async (req,res)=>{

 
  
  // crea la session 
  console.log(req.user)
  req.session.user = new TokenDTO({name:req.user.name,email:req.user.email,role:req.user.role,id:req.user.id,cart:req.user.cart})  
  
  
   return res.status(200).send({status:"success",payload:"Credenciales Correctas"});


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

const githubcallback = (req,res)=>{
  const user = req.user;

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
  return  res.send({status:"success",aux})
}

export default {    
  register,
  registerFall,
  login,
  logout,
  loginFail,
  githubcallback,
  current
  
}