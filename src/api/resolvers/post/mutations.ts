import { ObjectId } from "mongoose";
import { ICreatePostInput, IPost, IToggleLikeInput } from "../../../interfaces/IPost";
import { IUser } from "../../../interfaces/IUser";
import { deletePostById } from "../../../services/posts";
import createPost from "../../../services/posts/createPost";
import { getPost } from "../../../services/posts/getPost";
import toggleLike from "../../../services/posts/toggleLike";

const resolver = {
    /**
     * Removes a specific post.
     *
     * @param { void } _parent Previous resolver.
     * @param { string } postId The post id.
     * @param { { IUser } } context Authenticated user.
     * @returns { Promise<IPost> } The post, false value if not found.
     */
    deletePost: async (_parent: void, { postId }: { postId: string }, { user }: { user: IUser }): Promise<IPost> => {
        if (!user) {
            throw new Error("This option is valid only for authenticated users.");
        }

        const post = await getPost(postId);

        if(post.author.id !== user.id) {
            throw new Error("Only the author of this post can delete it.");
        }

        const deletedPost = await deletePostById(postId);
        return deletedPost;
    },

    /**
     * Creates a post.
     *
     * @param { void } _parent Previous resolver.
     * @param { { title: string, body: string } } postInput The post to create.
     * @param { { IUser } } context Authenticated user.
     * @returns { Promise<IPost> } The post that just created.
     */
    createPost: async (_parent: void, { title, body }: { title: string, body: string }, { user }: { user: IUser }): Promise<IPost> => {
        if (!user) {
            throw new Error("This option is valid only for authenticated users.");
        }

        const postInput: ICreatePostInput = {
            author: user.id,
            body,
            title,
            likes: [],
        };

        const post = await createPost(postInput);
        return post;
    },

    /**
     * Toggles like/dislike for a post from a given user.
     *
     * @param { void } _parent Previous resolver.
     * @param { ObjectId } postId The post to be liked.
     * @param { { IUser } } context Authenticated user.
     * @returns { Promise<IPost> } The post liked.
     */
    toggleLike: async (_parent: void, { postId }: { postId: ObjectId }, { user }: { user: IUser }): Promise<IPost> => {
        if (!user) {
            throw new Error("This option is valid only for authenticated users.");
        }

        const likeInput: IToggleLikeInput = {
            postId,
            userId: user.id,
        };

        const post = await toggleLike(likeInput);
        return post;
    },
};

export default resolver;
