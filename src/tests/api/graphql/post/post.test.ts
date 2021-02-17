import { createTestClient } from "apollo-server-testing";
import { ICreatePostInput } from "../../../../interfaces/IPost";
import { ICreateUserInput, IUser } from "../../../../interfaces/IUser";
import registerUser from "../../../../services/auth/registerUser";
import createPost from "../../../../services/posts/createPost";
import logger from "../../../../utils/logger";
import { getServer } from "../../../../utils/server";
import setupUsersDatabase from "../../../services/auth/setup";
import { CREATE_POST, DELETE_POST, GET_POST, TOGGLE_LIKE } from "./queries";

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

    it("shoult create a post", async () => {
        const server = getServer();

        const { mutate } = createTestClient(server);

        const { data } = await mutate({
            mutation: CREATE_POST,
            variables: {
                createPostInput: {
                    title: "test post",
                    body: "test body post",
                    author: user.id,
                    likes: [],
                },
            },
        });

        expect(data.createPost.title).toBe("test post");
        expect(data.createPost.body).toBe("test body post");
        expect(data.createPost.author.username).toBe("tester123");
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

    it("sould toggle like", async () => {
        const server = getServer();

        const { mutate } = createTestClient(server);

        const { errors } = await mutate({
            mutation: TOGGLE_LIKE,
            variables: {
                toggleLikeInput: {
                    userId: user.id,
                    postId,
                },
            },
        });

        logger.error(JSON.stringify(errors, null, "\t"));

        const { query } = createTestClient(server);

        const { data: postData } = await query({
            query: GET_POST,
            variables: { id: postId },
        });

        expect(postData.post.title).toBe("some title");
        expect(postData.post.likes.length).toBe(1);
    });

    it("sould delete a post", async () => {
        const server = getServer();

        const { mutate } = createTestClient(server);

        const { data, errors } = await mutate({
            mutation: DELETE_POST,
            variables: { postId },
        });

        logger.error(JSON.stringify(errors, null, "\t"));

        expect(data.deletePost.title).toBe("some title");
        expect(data.deletePost.body).toBe("some body");
        expect(data.deletePost.author.username).toBe("tester123");
    });
});
