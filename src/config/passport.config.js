import passport from "passport";
import local from "passport-local";
import userModel from "../dao/model/user.js";
import {userService ,cartsService} from "../services/index.service.js";
import { createHash ,validatePassword} from "../utils.js";
import GithubStrategy from 'passport-github2'


const LocalStrategy = local.Strategy;


const initializePassport = () =>{
    passport.use('register',new LocalStrategy({passReqToCallback: true, usernameField:'email'},async (req,email,password,done)=>{
        try{
            const {first_name,last_name} = req.body;
            // corroba si el usuario ya existe
           
            const exists = await userService.getUser({email})
            
            if (exists) return done(null,false,{message:"el usuario ya existe"});
            // si el usuario no existe , encriptamos la password
            const hasshedPassword = await createHash(password);
            //creamos el carrito
            const nuevoCart = await cartsService.createCart();
            // num 3 construimos el usuario

            const userAux = {
                first_name,
                last_name,
                email,
                cart:nuevoCart._id,
                password:hasshedPassword
        }
            const result = await userService.createUser(userAux);
            // si todo salio bien
            done(null,result);
        }catch(error){
            /*console.log("initializePassport",error)*/
            done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email'},async(email,password,done) => {
          
        let userAux2
    if (email=== process.env.ADMIN_EMAIL &&   password=== process.env.ADMIN_PWD ){
        userAux2 = {
            id: 0,
            name: `Admin`,
            email: "...",
            role:'admin'
         }
        return done(null,userAux2)
    }
    const userAux = await userService.getUser({email})
   
    if (!userAux) return done(null,false,{message:"credenciales incorrectas"});
    
    const isValidPassword = await validatePassword(password,userAux.password);

    if (!isValidPassword) return done(null,false,{message:"contraseña invalida"})
    // crea la session 
    userAux2 = {
        id:userAux._id,
        name: `${userAux.first_name} ${userAux.last_name}`,
        email: userAux.email,   
        role:userAux.role,
        cart:userAux.cart 
     }   
     done(null,userAux2);
    }))


    passport.use('github',new GithubStrategy({
        clientID:"Iv1.ce7d9857832de97b",
        clientSecret:"1684a195b22265a67821a35b62b4a65499e284e7",
        callbackURL:"http://localhost:4000/api/sessions/githubcallback"
    },async(accessToken,refreshToken,profile,done)=>{
        try {
            
            
            const {name,login} = profile._json;
            let emailGitHub= `${login}@github.com`
            
            const userAux = await userService.getUser({email:emailGitHub});
            
            if(!userAux){
                const newUser = {
                    first_name:name,
                    email:emailGitHub,
                    password:''
                }
                const result = await userService.createUser(newUser);
                return done(null,result);
            }
            done(null,userAux);
        } catch (error) {
            done(error);
        }
    } )) 

    passport.serializeUser(function(user,done){
        return done(null,user.id)
    })
    passport.deserializeUser(async function (id, done) {
        if(id===0){
            return done(null,{
                role:"admin",
                name:"ADMIN"
            })
        }
        const user = await userModel.findOne({ _id: id });
        return done(null, user);
      });


     
}

export default initializePassport;