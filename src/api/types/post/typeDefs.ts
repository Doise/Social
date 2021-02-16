import { gql } from "apollo-server";

export default gql`
    type Post {
        """
        mongodb ObjectId of the post
        """
        id: ID

        """
        post title
        """
        title: String

        """
        post body
        """
        body: String

        """
        the author of this post
        """
        author: User

        """
        array of users liked this post
        """
        likes: [User]
    }

    """
    Input for constructing a new post.
    """
    input CreatePostInput {
        title: String!
        body: String!
        author: ID!
        likes: [ID!]
    }

    """
    Input for toggle like.
    """
    input ToggleLikeInput {
        userId: String!
        postId: String!
    }
`;
