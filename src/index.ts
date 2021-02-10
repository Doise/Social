import { connect, connection, ConnectOptions } from "mongoose";
import config from "./utils/config";
import logger from "./utils/logger";

const connectOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

connect(config.databaseURL, connectOptions);
connection.on("error", logger.error);
connection.once("open", () => {
    logger.info("Database is connected. 👍👍");
});
