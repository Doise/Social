import { ApolloServer, Config, PubSub } from "apollo-server";
import { connect, ConnectOptions } from "mongoose";
import logger from "./logger";
import typeDefs from "../api/types";
import resolvers from "../api/resolvers";
import config from "./config";

export const mountDatabase = async (databaseName?: string): Promise<void> => {
    const connectOptions: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

    const url = databaseName ? config.databaseURL.replace("social", databaseName) : config.databaseURL;

    await connect(url, connectOptions);

    logger.info("Database is connected.");
};

export const getServer = (): ApolloServer => {
    const serverConfig: Config = {
        typeDefs,
        resolvers,
        context: {
            pubsub: new PubSub(),
        },
        introspection: true,
        playground: true,
    };

    return new ApolloServer(serverConfig);
};

export const createServer = async (): Promise<void> => {
    const server = getServer();

    const { url, subscriptionsUrl } = await server.listen({ port: config.port });

    logger.info(`Server ready at ${url}`);
    logger.info(`Subscriptions ready at ${subscriptionsUrl}`);
};
