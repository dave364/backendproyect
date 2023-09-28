import {Router} from "express"
import { privacy , handlePolicies} from "../middlewares/auth.js";
import passport from "passport";
import userController from "../controllers/users.controller.js"

const router = Router();

// Define la ruta base para la Callback de GitHub
let githubCallbackRoute = '/githubcallback'; // Ruta por defecto en ambiente local

// Verifica si estamos en un entorno de producción (por ejemplo, en Render)
if (process.env.NODE_ENV === 'production') {
  // Si estamos en producción, actualiza la ruta de Callback de GitHub
  githubCallbackRoute = '/api/sessions/githubcallback'; // Ruta para producción en Render
}

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFall',failureMessage:true}),userController.register)
router.get('/registerFall',userController.registerFall)    
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail' ,failureMessage:true}),userController.login)
router.get('/logout',userController.logout)
router.get('/loginFail',userController.loginFail)

router.get('/github',passport.authenticate('github'),(req,res)=>{

})

router.get('/githubCallbackRoute',passport.authenticate('github'),userController.githubcallback)

router.get('/current',privacy('PRIVATED'),handlePolicies(['USER']),userController.current)

router.post('/restoreRequest',userController.restoreRequest)

router.post('/restorePassword',userController.restorePassword)


export default router;