import { ApolloServer, Config } from "apollo-server";
import { connect, ConnectOptions } from "mongoose";
import logger from "./logger";
import typeDefs from "../api/types";
import resolvers from "../api/resolvers";
import config from "./config";
import { deserializeUser } from "../services/auth/auth";

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

export const getServer = (auth? : string): ApolloServer => {
    const serverConfig: Config = {
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            let token = req?.headers?.authorization || auth;

            if (!token) {
                return { user: null };
            }

            [, token] = token.split(" ");

            try {
                const user = await deserializeUser(token);
                return { user };
            } catch (e) {
                return { user: null };
            }
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
