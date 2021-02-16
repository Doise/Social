import { gql } from "apollo-server";
import userMutatuin from "./user/mutations";
import userQuery from "./user/queries";
import userTypeDefs from "./user/typeDefs";

const baseTypeDef = gql`
    type Query

    type Mutation

    # type Subscription
`;

export default [baseTypeDef, userTypeDefs, userQuery, userMutatuin];
