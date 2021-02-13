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

    extend type Query {
        """
        get user by id
        """
        user(userId: String!): User!
    }

    extend type Mutation {
        """
        Constructs a new user in the database and generates a token.
        """
        createUser(createUserInput: CreateUserInput!): UserResult!

        """
        Generates a fresh jsonwebtoken for a given user.
        """
        loginUser(loginUserInput: LoginUserInput): UserResult!

        """
        Updates a registered user.
        """
        updateUser(updateUserInput: UpdateUserInput!): UserResult!

        # """
        # Generates a fresh jsonwebtoken from a token.
        # """
        # refreshToken(token: String!): UserResult!
    }

    type UserResult {
        user: User!
        token: String!
    }

    input CreateUserInput {
        username: String!
        password: String!
        email: String!
        status: String
    }

    input LoginUserInput {
        identity: String!
        password: String!
    }

    input UpdateUserInput {
        token: String!
        username: String
        password: String
        email: String
        status: String
    }
`;
