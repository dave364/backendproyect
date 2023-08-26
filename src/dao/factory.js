import mongoose from 'mongoose';
import config from '../config.js';

export default class PersistenceFactory {
    static async getPersistence() {
        let usersDAO;
        let productDAO;
        let cartDAO;
        let ticketDAO;
        switch(process.env.PERSISTENCE) {            
            case "FS":
                
                break;
            
            case "MONGO":
                //mongoose.connect(process.env.MONGO_URL)
                const {default: userMongoDAO} = await import('./managers/user.manager.js')
                usersDAO = new userMongoDAO();

                const {default: productMongoDAO} = await import('./managers/products.manager.js')
                productDAO = new productMongoDAO();

                const {default :cartMongoDAO} = await import ('./managers/cart.manager.js')
                cartDAO = new cartMongoDAO();

                const {default : ticketMongoDAO} = await import ('./managers/ticket.manager.js')
                ticketDAO = new ticketMongoDAO();               

                break;
        }
        return {
            usersDAO,
            productDAO,
            cartDAO,
            ticketDAO
            
        };
    }

}