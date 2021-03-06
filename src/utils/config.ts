import { config } from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

config();

export default {
    /**
     * node enviroment
     */
    isProduction: process.env.NODE_ENV !== "development",

    /**
     * favorite port
     */
    port: process.env.PORT || 5000,

    /**
     * mongodb atlas connection string
     */
    databaseURL: process.env.MONGODB_URI,

    /**
     * token expiration
     */
    jwrExpiration: process.env.JWT_LIFE_TIME,

    /**
     * token secret key
     */
    jwrSecret: process.env.JWT_SECRET,

    /**
     * nodemailer username
     */
    mailUser: process.env.MAIL_USER,

    /**
     * nodemailer secret
     */
    mailSecret: process.env.MAIL_SECRET,
};
