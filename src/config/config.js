import dotenv from 'dotenv';

dotenv.config();

export default {
    app: {
        PORT : process.env.PORT||4000,
        SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL,
        SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD
    },
    mongo:{
        URL: process.env.MONGO_URL
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET
    },
    mailer:{
        USER: process.env.APP_EMAIL,
        PASSWORD: process.env.APP_PASSWORD
    }
}