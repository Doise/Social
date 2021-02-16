import { ObjectId } from "mongoose";
import { IPost } from "../../interfaces/IPost";
import Post from "../../models/post";

/**
 * Get a single post by post id.
 * 
 * @param { ObjectId } postId The post id.
 * @returns { Promise<IPost> } The post, false value if not found.
 */
export const getPost = async (postId: ObjectId | string): Promise<IPost> => {
    const post = await Post.findById(postId).populate("author", "-password").populate("likes", "-password");
    return (post as unknown) as IPost;
};

/**
 * Get all posts on database.
 * 
 * @returns { Promise<IPost[]> } The posts, false value if not found.
 */
export const getPosts = async (): Promise<IPost[]> => {
    const posts = await Post.find().populate("author", "-password").populate("likes", "-password");
    return (posts as unknown[]) as IPost[];
};

/**
 * Get all posts from a specific author.
 * 
 * @param { ObjectId } userId The post id.
 * @returns { Promise<IPost[]> } The posts, false value if not found.
 */
export const getUserPosts = async (userId: ObjectId): Promise<IPost[]> => {
    const posts = await Post.find({ author: userId }).populate("author", "-password").populate("likes", "-password");
    return (posts as unknown[]) as IPost[];
};
