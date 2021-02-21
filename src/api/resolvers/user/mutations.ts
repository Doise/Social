import { ICreateUserInput, ILoginUserInput, IUpdateUserInput, IUser, IUserResult } from "../../../interfaces/IUser";
import { loginUser, registerUser, updateUser } from "../../../services/auth";
import { deserializeUser, serializeUser } from "../../../services/auth/auth";

const resolver = {
    /**
     * Constructs a new user in the database and generates a token.
     *
     * @param { void } _parent Previous resolver.
     * @param { ICreateUserInput } createUserInput User properties to construct a user from.
     * @returns { Promise<IUserResult> } The user that created and a fresh generated json web token.
     */
    createUser: async (
        _parent: void,
        { createUserInput }: { createUserInput: ICreateUserInput },
    ): Promise<IUserResult> => {
        const userResult = await registerUser(createUserInput);
        return userResult;
    },

    /**
     * Generates a fresh jsonwebtoken for a given user.
     *
     * @param { void } _parent Previous resolver.
     * @param { ILoginUserInput } loginUserInput The user identity (username/email) and the password.
     * @returns { Promise<IUserResult> } The requested user and a fresh generated json web token.
     */
    loginUser: async (_parent: void, { loginUserInput }: { loginUserInput: ILoginUserInput }): Promise<IUserResult> => {
        const userResult = await loginUser(loginUserInput);
        return userResult;
    },

    /**
     * Updates a registered user.
     *
     * @param { void } _parent Previous resolver.
     * @param { IUpdateUserInput } updateUserInput The user properties to update.
     * @returns { Promise<IUserResult> } The updated user and a fresh generated json web token.
     */
    updateUser: async (
        _parent: void,
        { updateUserInput }: { updateUserInput: IUpdateUserInput },
    ): Promise<IUserResult> => {
        const userResult = await updateUser(updateUserInput);
        return userResult;
    },

    /**
     * Refreshes the current token.
     *
     * @param { void } _parent Previous resolver.
     * @param { string } token The current token.
     * @returns { Promise<IUserResult> } The user and a fresh token.
     */
    refreshToken: async (_parent: void, { token }: { token: string }): Promise<IUserResult> => {
        const user = ((await deserializeUser(token)) as unknown) as IUser;
        const fToken = serializeUser(user.id);
        return { user, token: fToken };
    },
};

export default resolver;
