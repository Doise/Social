/* eslint no-underscore-dangle: "off" */
import { ICreatePostInput } from "../../../interfaces/IPost";
import { ICreateUserInput, IUser } from "../../../interfaces/IUser";
import registerUser from "../../../services/auth/registerUser";
import createPost from "../../../services/posts/createPost";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

describe("createPost", () => {
    let user: IUser;

    beforeAll(async () => {
        const userInput: ICreateUserInput = {
            email: "test@gmail.com",
            username: "test",
            password: "tesT$1234",
        };

        const userResult = await registerUser(userInput);
        user = userResult.user;
    });

    it("should create a post", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The first one",
            body: "This is great! 😁",
            likes: [],
        };

        const post = await createPost(postInput);
        expect(post.title).toBe("The first one");
    });

    it("should throw 'Post title' error", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "",
            body: "This is great! 😁",
            likes: [],
        };

        await expect(createPost(postInput)).rejects.toThrow(/^(Post title)/);
    });

    it("should throw 'Post body' error", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The first one",
            body: "",
            likes: [],
        };

        await expect(createPost(postInput)).rejects.toThrow(/^(Post body)/);
    });
});
