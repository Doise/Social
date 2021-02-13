import { ICreatePostInput, IPost } from "../../interfaces/IPost";
import Post from "../../models/post";

/**
 * Creates a post.
 * 
 * @param { ICreatePostInput } postInput The post to create.
 * @returns { Promise<IPost> } The post that just created.
 */
export default async (postInput: ICreatePostInput): Promise<IPost> => {
    /**
     * validate input
     */
    if (!postInput.title || postInput.title.length < 5) {
        throw new Error("Post title must contain at least 5 characters.");
    }

    if (!postInput.body || postInput.body.length < 5) {
        throw new Error("Post body must contain at least 5 characters.");
    }

    /**
     * construct and save new post
     */
    const post = await new Post(postInput).save();

    /**
     * returns the populated doc.
     */
    const fullDoc = await post.populate("author", "-password").populate("likes", "-password").execPopulate();
    return fullDoc as unknown as IPost;
};
