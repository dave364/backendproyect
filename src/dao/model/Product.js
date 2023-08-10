import  mongoose  from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "products";

const schema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    InCart:Boolean
})

schema.plugin(mongoosePaginate);
const productModel = mongoose.model(collection,schema)

export default productModel;




