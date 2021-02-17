import userQueries from "./user/queries";
import postQueries from "./post/queries";
import userMutations from "./user/mutations";
import postMutations from "./post/mutations";

export default {
    Query: {
        ...userQueries,
        ...postQueries,
    },
    Mutation: {
        ...userMutations,
        ...postMutations,
    },
    // Subscription: {},
};
