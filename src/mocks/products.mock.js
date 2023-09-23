import {faker} from '@faker-js/faker/locale/es'

export const generateProducts = () =>{
    return{ 
           id:faker.database.mongodbObjectId(),
           title:faker.commerce.productName(),
           description:faker.commerce.productDescription(),
           price:faker.commerce.price(),
           thumbnail:faker.image.url(),
           code:faker.string.alphanumeric(10),
           stock:faker.number.int({min:0,max:20}),
           category:faker.commerce.department(),
           status:faker.datatype.boolean()
    }
}