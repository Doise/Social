import { ICreatePostInput } from "../../../interfaces/IPost";
import { ICreateUserInput, IUser } from "../../../interfaces/IUser";
import registerUser from "../../../services/auth/registerUser";
import createPost from "../../../services/posts/createPost";
import setupUsersDatabase from "./setup";
import { getPost, getPosts, getUserPosts } from "../../../services/posts/getPost";

setupUsersDatabase("testDatabase");

describe("getPost", () => {
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

    it("should get a post author username", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The first one",
            body: "This is great! 😁",
            likes: [],
        };

        const createdPost = await createPost(postInput);
        const post = await getPost(createdPost.id);
        expect(post.author.username).toBe("test");
    });

    it("should get all user posts", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The second one",
            body: "This is awesome! 😁",
        };

        await createPost(postInput);
        await expect(getUserPosts(user.id)).resolves.toHaveLength(2);
    });

    it("should get all posts", async () => {
        const postInput: ICreatePostInput = {
            author: user.id,
            title: "The third one",
            body: "This is mindlowing! 😁",
        };

        await createPost(postInput);
        await expect(getPosts()).resolves.toHaveLength(3);
    });
});
