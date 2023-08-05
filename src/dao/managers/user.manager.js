
import userModel from "../model/user.js";

export default class UserManager {

    
    createUser = (user) =>{
       return userModel.create(user);
    }
    getUser = (user) => {
        return userModel.findOne(user);
     }  
}

