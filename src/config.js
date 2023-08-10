import dotenv from 'dotenv';

dotenv.config();

export default {
    PERSISTENCE: process.env.PERSISTENCE,
    MONGO_URL: process.env.MONGO_URL
}