import { Schema } from "mongoose";
import { ICreatePostInput, IToggleLikeInput } from "../../../interfaces/IPost";
import { ICreateUserInput, IUser } from "../../../interfaces/IUser";
import registerUser from "../../../services/auth/registerUser";
import createPost from "../../../services/posts/createPost";
import toggleLike from "../../../services/posts/toggleLike";
import setupUsersDatabase from "./setup";
import { getPost } from "../../../services/posts/getPost";

setupUsersDatabase("testDatabase");

describe("toggleLike", () => {
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

    it("should like a post", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The first one",
            body: "This is great! 😁",
            likes: [],
        };

        const post = await createPost(postInput);
        expect((post).likes.length).toBe(0);

        const likeInput: IToggleLikeInput = {
            postId: post.id,
            userId: user.id,
        };

        await toggleLike(likeInput);
        const likedPost = await getPost(post.id);
        expect(likedPost.likes[0].username).toBe("test");
    });
    
    it("should dislike a post", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The first one",
            body: "This is great! 😁",
            likes: [],
        };

        const post = await createPost(postInput);
        expect((post).likes.length).toBe(0);

        const likeInput: IToggleLikeInput = {
            postId: post.id,
            userId: user.id,
        };

        await toggleLike(likeInput);
        await toggleLike(likeInput);
        const likedPost = await getPost(post.id);
        expect(likedPost.likes.length).toBe(0);
    });
    
    it("should throw 'Post not found'", async () => {
        const likeInput: IToggleLikeInput = {
            postId: new Schema.Types.ObjectId("sdf"),
            userId: user.id,
        };

        await expect(toggleLike(likeInput)).rejects.toThrow(/(Post not found)/);
    });
});
