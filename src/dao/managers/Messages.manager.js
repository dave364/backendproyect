import messageModel from "../model/message.js";

export default class MessagesManagerMongo {
    getMessages = (params) =>{
        return messageModel.find(params).lean();
    }

    createMessages = (message) =>{
        return messageModel.create(message);
    }

}