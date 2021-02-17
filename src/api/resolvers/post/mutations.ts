import { ICreatePostInput, IPost, IToggleLikeInput } from "../../../interfaces/IPost";
import { deletePostById } from "../../../services/posts";
import createPost from "../../../services/posts/createPost";
import toggleLike from "../../../services/posts/toggleLike";

const resolver = {
    /**
     * Removes a specific post.
     *
     * @param { void } _parent Previous resolver.
     * @param { string } postId The post id.
     * @returns { Promise<IPost> } The post, false value if not found.
     */
    deletePost: async (_parent: void, { postId }: { postId: string }): Promise<IPost> => {
        const post = await deletePostById(postId);
        return post;
    },

    /**
     * Creates a post.
     *
     * @param { void } _parent Previous resolver.
     * @param { ICreatePostInput } postInput The post to create.
     * @returns { Promise<IPost> } The post that just created.
     */
    createPost: async (_parent: void, { createPostInput }: { createPostInput: ICreatePostInput }): Promise<IPost> => {
        const post = await createPost(createPostInput);
        return post;
    },

    /**
     * Toggles like/dislike for a post from a given user.
     *
     * @param { void } _parent Previous resolver.
     * @param { ICreatePostInput } toggleLikeInput The user and the post to be liked.
     * @returns { Promise<IPost> } The post liked.
     */
    toggleLike: async (_parent: void, { toggleLikeInput }: { toggleLikeInput: IToggleLikeInput }): Promise<IPost> => {
        const post = await toggleLike(toggleLikeInput);
        return post;
    },
};

export default resolver;
