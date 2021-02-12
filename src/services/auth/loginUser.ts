import { compare } from "bcryptjs";

import Logger from "../../utils/logger";
import User from "../../models/user";

import { ILoginUserResult, ILoginUserInput } from "../../interfaces/IUser";
import { getAuthToken } from "./auth";

/**
 * Generates a fresh jsonwebtoken for a given user.
 *
 * @todo not tested yet
 *
 * @param { ILoginUserInput } loginUserInput The user identity (username/email) and the password.
 * @returns { Promise<ILoginUserResult> } The requested user and a fresh generated json web token.
 */
export default async (loginUserInput: ILoginUserInput): Promise<ILoginUserResult> => {
    try {
        /**
         * find the user by his identity (username or email).
         */
        // const user = await User.findOne({ email: loginUserInput.identity });
        const user = await User.findOne({
            $or: [{ email: loginUserInput.identity }, { username: loginUserInput.identity }],
        });

        /**
         * this username is not signed up.
         */
        if (!user) {
            throw new Error("Bad username/password, login failed.");
        }

        /**
         * compare the password with the stored hash.
         */
        const isPasswordEquals = await compare(loginUserInput.password, user.password);

        if (!isPasswordEquals) {
            throw new Error("Bad username/password, login failed.");
        }

        /**
         * return the user and a fresh generated token.
         */
        return {
            user,
            token: getAuthToken(user),
        };
    } catch (error) {
        /**
         * may be that mongoose or bcrypt are throwing..
         */
        Logger.error(`auth.loginUser => ${error}`);
        throw new Error(error.message);
    }
};
