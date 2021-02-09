import { config } from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * node enviroment
     */
    isProduction: process.env.NODE_ENV !== "development",

    /**
     * favorite port
     */
    port: process.env.PORT,

    /**
     * mongodb atlas connection string
     */
    databaseURL: process.env.MONGODB_URI,

    /**
     * bcryptjs salt
     */
    bcryptSecret: process.env.BCRYPT_SECRET,

    /**
     * token expiration
     */
    jwrExpiration: process.env.JWT_LIFE_TIME,

    /**
     * token secret key
     */
    jwrSecret: process.env.JWT_SECRET,
};
