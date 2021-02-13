import { ObjectId } from "mongoose";
import { IPost } from "../../interfaces/IPost";
import Post from "../../models/post";

export const getPost = async (postId: ObjectId): Promise<IPost> => {
    const post = await Post.findById(postId).populate("author", "-password").populate("likes", "-password");
    return (post as unknown) as IPost;
};

export const getPosts = async (): Promise<IPost[]> => {
    const posts = await Post.find().populate("author", "-password").populate("likes", "-password");
    return (posts as unknown[]) as IPost[];
};

export const getUserPosts = async (userId: ObjectId): Promise<IPost[]> => {
    const posts = await Post.find({ author: userId }).populate("author", "-password").populate("likes", "-password");
    return (posts as unknown[]) as IPost[];
};
