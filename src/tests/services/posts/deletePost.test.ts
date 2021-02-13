/* eslint no-underscore-dangle: "off" */
import { ICreatePostInput } from "../../../interfaces/IPost";
import { ICreateUserInput, IUser } from "../../../interfaces/IUser";
import registerUser from "../../../services/auth/registerUser";
import createPost from "../../../services/posts/createPost";
import deletePost from "../../../services/posts/deletePost";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

describe("deletePost", () => {
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

    it("should delete a post", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The first one",
            body: "This is great! 😁",
            likes: [],
        };

        const post = await createPost(postInput);
        await expect(deletePost(post.id)).resolves.toBeTruthy();
    });

    it("should be falsy", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The first one",
            body: "This is great! 😁",
            likes: [],
        };

        const post = await createPost(postInput);
        await expect(deletePost(post.id)).resolves.toBeTruthy();
        await expect(deletePost(post.id)).resolves.toBeFalsy();
    });
});
