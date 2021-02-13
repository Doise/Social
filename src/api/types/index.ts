import { gql } from "apollo-server";
import userTypeDefs from "./user";

const baseTypeDef = gql`
    type Query

    type Mutation

    # type Subscription
`;

export default [baseTypeDef, userTypeDefs];
