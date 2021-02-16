import { gql } from "apollo-server";

export default gql`
    type User {
        """
        mongodb ObjectId of the user
        """
        id: ID!

        """
        user display name
        """
        username: String!

        """
        email address
        """
        email: String!

        """
        user status
        """
        status: String!
    }

    """
    Result message contains the returned user and a token.
    """
    type UserResult {
        user: User!
        token: String!
    }

    """
    Input for constructing a new user.
    """
    input CreateUserInput {
        username: String!
        password: String!
        email: String!
        status: String
    }

    """
    Input for login.
    """
    input LoginUserInput {
        identity: String!
        password: String!
    }

    """
    Input for user fields update.
    """
    input UpdateUserInput {
        token: String!
        username: String
        password: String
        email: String
        status: String
    }
`;
