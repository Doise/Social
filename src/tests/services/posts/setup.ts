import { connection } from "mongoose";
import Post from "../../../models/post";
import User from "../../../models/user";
import { mountDatabase } from "../../../utils/server";

export default (databaseName: string): void => {
    beforeAll(async () => {
        await mountDatabase(databaseName);
    }, 20_000);

    afterAll(async () => {
        await Post.deleteMany();
        await User.deleteMany();
        await connection.close();
    });
};
