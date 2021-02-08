require('dotenv').config();
export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME;
export const JWT_SECRET = process.env.JWT_SECRET;