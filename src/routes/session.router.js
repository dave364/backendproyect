import {Router} from "express"
import { privacy , handlePolicies} from "../middlewares/auth.js";
import passport from "passport";
import userController from "../controllers/users.controller.js"

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFall',failureMessage:true}),userController.register)
router.get('/registerFall',userController.registerFall)    
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail' ,failureMessage:true}),userController.login)
router.get('/logout',userController.logout)
router.get('/loginFail',userController.loginFail)

router.get('/github',passport.authenticate('github'),(req,res)=>{

})

router.get('/githubcallback',passport.authenticate('github'),userController.githubcallback)

router.get('/current',privacy('PRIVATED'),handlePolicies(['USER']),userController.current)

export default router;