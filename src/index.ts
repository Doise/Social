import { ApolloServer, PubSub } from "apollo-server";
import { connect, ConnectOptions } from "mongoose";
import logger from "./utils/logger";
import typeDefs from "./api/types";
import resolvers from "./api/resolvers";
import config from "./utils/config";

const pubsub = new PubSub();
const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });

const connectOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

connect(config.databaseURL, connectOptions)
    .then(() => {
        logger.info("Database is connected. 👍👍");
        return server.listen();
    })
    .then(({ url, subscriptionsUrl }) => {
        logger.info(`🚀 Server ready at ${url}`);
        logger.info(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
    });
