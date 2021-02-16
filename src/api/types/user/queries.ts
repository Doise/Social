import { gql } from "apollo-server";

export default gql`
    extend type Query {
        """
        get user by id
        """
        user(userId: String!): User!
    }
`;
