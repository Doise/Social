import { gql } from "apollo-server";

export default gql`
    extend type Mutation {
        """
        Creates a post.
        """
        createPost(title: String!, body: String!): Post

        """
        Removes a specific post.
        """
        deletePost(postId: String!): Post

        """
        Toggles like/dislike for a post from a given user.
        """
        toggleLike(postId: String!): Post
    }
`;
