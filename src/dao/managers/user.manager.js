
import userModel from "../model/user.js";
import mongoose from "mongoose";

export default class UserManager {

    
    createUser = (user) =>{
       return userModel.create(user);
    }
    getUser = (user) => {
        return userModel.findOne(user);
     }  
     updateUser = (id, user) => {
      return userModel.findByIdAndUpdate(id, { $set: user });
    };

    getUserAll = () =>{
      return userModel.find()
   }

   updateUser = (id, user) => {
    return userModel.findByIdAndUpdate(id, { $set: user });
  };
  
    deleteUser = (id) => {
      return userModel.findByIdAndDelete(id);
    };

     changeRole = async (user) => {
      const idValido = new mongoose.Types.ObjectId(user);
       let userBuscado = await userModel.findOne(idValido);
       console.log("hola")
       console.log(userBuscado)
       console.log("termine")
       let roleAux
       if (userBuscado.role === "user") {         
         roleAux="premium"
       }
       else{
         roleAux="user"
       }    
       return userModel.findByIdAndUpdate({'_id':idValido},{$set:{role:roleAux}}) 
       

     }
}


