export const privacy = (privacyType) =>{
    return (req,res,next) => {
        const {user} = req.session;
        switch (privacyType){
            case "PRIVATED":
                // esta validacion es para dejar pasar a los que estan logeados 
                if (user) next();
                else res.redirect('/login')
            break;
            case "NO_AUTHENTICATED":

                   if (!user) next();
                   else res.redirect('/profile')

            break;
        }
    };
};

export const authRoles = (role) =>{
    //Si llegué a este punto, SIEMPRE debo tener un usuario ya. 
    return async(req,res,next) => {
      if(req.session.user.role!=role) return res.status(403).send({status:"error",error:"Fobidden"})
      next();
    }
  }

  export const handlePolicies = (policies) => {
    //policies, contendrá TODOS los roles que puedan entrar.
    return (req,res,next) =>{
        if(policies[0] === "PUBLIC") return next();
        const userPolicies = req.session.user;
        if(!userPolicies) return res.status(401).send({status:"error",error:"Unauthorized"});
        //Si NO está incluido el rol del usuario.
        if(!policies.includes(userPolicies.role.toUpperCase())) return res.status(403).send({status:"error",error:"Forbidden"})
        req.session.user = userPolicies;
        next();
    }
}


