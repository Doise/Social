import { createTestClient } from "apollo-server-testing";
import { ICreatePostInput } from "../../../../interfaces/IPost";
import { ICreateUserInput, IUser } from "../../../../interfaces/IUser";
import registerUser from "../../../../services/auth/registerUser";
import createPost from "../../../../services/posts/createPost";
import { getServer } from "../../../../utils/server";
import setupUsersDatabase from "../../../services/auth/setup";
import { GET_POST } from "./queries";

setupUsersDatabase("testDatabase");

describe("graphql.post", () => {
    let user: IUser;
    // let token: string;
    let postId: string;

    beforeAll(async () => {
        const userInput: ICreateUserInput = {
            email: "test123@gmail.co.il",
            username: "tester123",
            password: "Test3r!to",
        };

        const result = await registerUser(userInput);
        user = result.user;
        // token = result.token;

        const postInput: ICreatePostInput = {
            author: user.id,
            body: "some body",
            title: "some title",
            likes: [],
        };

        const post = await createPost(postInput);
        postId = post.id;
    });

    it("sould return a post", async () => {
        const server = getServer();

        const { query } = createTestClient(server);

        const { data } = await query({
            query: GET_POST,
            variables: { id: postId },
        });

        expect(data.post.title).toBe("some title");
        expect(data.post.body).toBe("some body");
        expect(data.post.author.username).toBe("tester123");
    });
});
