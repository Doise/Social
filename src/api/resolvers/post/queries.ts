import { Schema } from "mongoose";
import { getPost } from "../../../services/posts/getPost";
import { IPost } from "../../../interfaces/IPost";

const queries = {
    /**
     * Get a single post by post id.
     *
     * @param { void } _parent Previous resolver.
     * @param { string } postId The post id.
     * @returns { Promise<IPost> } The post, false value if not found.
     */
    post: async (_parent: void, { postId }: { postId: Schema.Types.ObjectId }): Promise<IPost> => {
        const post = await getPost(postId);
        return post;
    },
};

export default queries;
