export default class UsersRepository {
    constructor(dao){
        this.dao =dao;
    }
    createUser = (user)=>{
        return this.dao.createUser(user);
    }
    getUser= (user)=>{
        return this.dao.getUser(user);
    }

    updateUser = (id, user) => {
        return this.dao.updateUser(id,user);
      };
    
      deleteUser = (id) => {
        return this.dao.deleteUser(id);
      };

    changeRole = (user)=>{
        return this.dao.changeRole(user);
    }
}