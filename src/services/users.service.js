export default class UsersService {
    constructor(dao){
        this.dao =dao;
    }
    createUser = (user)=>{
        return this.dao.createUser(user);
    }
    getUser= (user)=>{
        return this.dao.getUser(user);
    }
}
