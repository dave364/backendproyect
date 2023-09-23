import  mongoose  from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "products";

const schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    thumbnail:Array,
    code:String,
    stock:Number,
    category:String,
    status:Boolean,
    owner:{
        type:String,
        default:'admin'
    }
})

schema.plugin(mongoosePaginate);
const productModel = mongoose.model(collection,schema)

export default productModel;




