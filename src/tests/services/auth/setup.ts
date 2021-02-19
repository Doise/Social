import { connection } from "mongoose";
import user from "../../../models/user";
import post from "../../../models/post";
import { mountDatabase } from "../../../utils/server";

export default (databaseName: string): void => {
    beforeAll(async () => {
        await mountDatabase(databaseName);
    }, 20_000);

    afterAll(async () => {
        await user.deleteMany();
        await post.deleteMany();
        await connection.close();
    });
};
