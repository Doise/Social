import { gql } from "apollo-server";

export default gql`
    extend type Query {
        """
        get post by id
        """
        post(postId: String!): Post
    }
`;
