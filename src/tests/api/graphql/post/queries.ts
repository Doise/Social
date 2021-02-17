import { gql } from "apollo-server";

export const GET_POST = gql`
    query GetPost($id: String!) {
        post(postId: $id) {
            id
            title
            body
            author {
                id
                username
                email
                status
            }
            likes {
                id
                username
                email
                status
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
        createPost(createPostInput: $createPostInput) {
            id
            title
            body
            author {
                username
            }
            likes {
                username
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($postId: String!) {
        deletePost(postId: $postId) {
            title
            id
            body
            author {
                username
            }
            likes {
                username
            }
        }
    }
`;

export const TOGGLE_LIKE = gql`
    mutation ToggleLike($toggleLikeInput: ToggleLikeInput!) {
        toggleLike(toggleLikeInput: $toggleLikeInput) {
            id
        }
    }
`;
