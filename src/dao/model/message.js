import mongoose from "mongoose";

const collection = 'messages'

const schema =  new mongoose.Schema({
    user:String,
    message:String
},{timestamps:{createAt:'created_at',updateAt:'updated_at'}}
)


const messageModel = mongoose.model(collection,schema)

export default messageModel;