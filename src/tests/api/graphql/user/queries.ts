import { gql } from "apollo-server";

export const GET_USER = gql`
    query GetUser($id: String!) {
        user(userId: $id) {
            id
            username
            email
            status
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($identity: String!, $password: String!) {
        loginUser(loginUserInput: { identity: $identity, password: $password }) {
            user {
                id
                username
                email
                status
            }
            token
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($updateUserInput: UpdateUserInput!) {
        updateUser(updateUserInput: $updateUserInput) {
            user {
                id
                username
                email
                status
            }
            token
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            user {
                id
                username
                email
                status
            }
            token
        }
    }
`;

export const REFRESH_TOKEN = gql`
    mutation refreshToken($token: String!) {
        refreshToken(token: $token) {
            user {
                id
                username
                email
                status
            }
            token
        }
    }
`;
