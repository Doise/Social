import { IPost, IToggleLikeInput } from "../../interfaces/IPost";
import Post from "../../models/post";

/**
 * Toggles like/dislike for a post from a given user.
 *
 * @param { IToggleLikeInput } toggleLikeInput The user and the post to be liked.
 * @returns { Promise<IPost> } The post liked.
 */
export default async (toggleLikeInput: IToggleLikeInput): Promise<IPost> => {
    try {
        /**
         * find the post to toggle like.
         */
        const post = await Post.findById(toggleLikeInput.postId);

        /**
         * chek if the user already liked it or not
         */
        const likeIndex = post.likes.findIndex(user => `${user}` === `${toggleLikeInput.userId}`);

        /**
         * update the likes array and save the doc.
         */
        if (likeIndex === -1) {
            post.likes.push(toggleLikeInput.userId);
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        return (await post.populate("author", "-password").populate("likes", "-password").execPopulate() as unknown) as IPost;
    } catch (e) {
        throw new Error("Post not found");
    }
};
