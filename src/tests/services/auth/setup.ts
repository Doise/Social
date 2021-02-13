import { connect, connection, ConnectOptions } from "mongoose";
import user from "../../../models/user";
import config from "../../../utils/config";

export default (databaseName: string): void => {
    beforeAll(async () => {
        const connectOptions: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        };

        await connect(config.databaseURL.replace("<dbname>", databaseName), connectOptions);
        
    }, 20_000);
    
    afterAll(async () => {
        await user.deleteMany();
        await connection.close();
    });
};
