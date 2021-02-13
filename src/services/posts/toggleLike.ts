import { IToggleLikeInput } from "../../interfaces/IPost";
import Post from "../../models/post";
import logger from "../../utils/logger";

export default async (toggleLikeInput: IToggleLikeInput): Promise<void> => {
    try {
        /**
         * find the post to toggle like.
         */
        const post = await Post.findById(toggleLikeInput.postId);

        /**
         * chek if the user already liked it or not
         */
        const likeIndex = post.likes.findIndex(user => `${user}` === `${toggleLikeInput.userId}`);
        logger.info(post.likes);

        /**
         * update the likes array and save the doc.
         */
        if (likeIndex === -1) {
            post.likes.push(toggleLikeInput.userId);
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
    } catch (e) {
        throw new Error("Post not found");
    }
};
