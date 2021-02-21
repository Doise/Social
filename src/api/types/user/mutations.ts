import { gql } from "apollo-server";

export default gql`
    extend type Mutation {
        """
        Constructs a new user in the database and generates a token.
        """
        createUser(createUserInput: CreateUserInput!): UserResult

        """
        Generates a fresh jsonwebtoken for a given user.
        """
        loginUser(loginUserInput: LoginUserInput): UserResult

        """
        Updates a registered user.
        """
        updateUser(updateUserInput: UpdateUserInput!): UserResult

        # """
        # Generates a fresh jsonwebtoken from a token.
        # """
        refreshToken(token: String!): UserResult!
    }
`;
