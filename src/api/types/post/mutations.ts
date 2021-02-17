import { gql } from "apollo-server";

export default gql`
    extend type Mutation {
        """
        Creates a post.
        """
        createPost(createPostInput: CreatePostInput!): Post

        """
        Removes a specific post.
        """
        deletePost(postId: String!): Post

        """
        Toggles like/dislike for a post from a given user.
        """
        toggleLike(toggleLikeInput: ToggleLikeInput!): Post
    }
`;
