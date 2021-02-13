import { connect, connection, ConnectOptions } from "mongoose";
import Post from "../../../models/post";
import User from "../../../models/user";
import config from "../../../utils/config";

export default (databaseName: string): void => {
    beforeAll(async () => {
        const connectOptions: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        };

        await connect(config.databaseURL.replace("social", databaseName), connectOptions);
    }, 20_000);

    afterAll(async () => {
        await Post.deleteMany();
        await User.deleteMany();
        await connection.close();
    });
};
