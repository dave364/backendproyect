export default class TokenDTO {
    constructor(user){
        this.name =user.name,
        this.email = user.email,   
        this.role =user.role,
        this.id =user.id,
        this.cart =user.cart 
    }
}