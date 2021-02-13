import { ObjectId } from "mongoose";
import { IPost } from "../../interfaces/IPost";
import Post from "../../models/post";

/**
 * Removes a specific post.
 * 
 * @param { ObjectId } postId The post id.
 * @returns { Promise<IPost> } The post, false value if not found.
 */
export default async (postId: ObjectId): Promise<IPost> => {
    const post = await Post.findByIdAndDelete(postId);
    return (post as unknown) as IPost;
};
