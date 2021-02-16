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

export const abc = 1;
