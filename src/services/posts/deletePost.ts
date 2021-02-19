import { IPost } from "../../interfaces/IPost";
import Post from "../../models/post";

/**
 * Removes a specific post.
 *
 * @param { string } postId The post id.
 * @returns { Promise<IPost> } The post, false value if not found.
 */
export default async (postId: string): Promise<IPost> => {
    const post = await (
        await Post.findByIdAndDelete(postId).populate("author", "-password").populate("likes", "-password")
    ).execPopulate();
    return (post as unknown) as IPost;
};
