import { compare } from "bcryptjs";
import User from "../../models/user";

import { ILoginUserInput, IUserResult } from "../../interfaces/IUser";
import { serializeUser } from "./auth";

/**
 * Generates a fresh jsonwebtoken for a given user.
 *
 * @param { ILoginUserInput } loginUserInput The user identity (username/email) and the password.
 * @returns { Promise<IUserResult> } The requested user and a fresh generated json web token.
 */
export default async (loginUserInput: ILoginUserInput): Promise<IUserResult> => {
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
            /* eslint no-underscore-dangle: "off" */
            token: serializeUser(user._id),
        };
    } catch (error) {
        /**
         * may be that mongoose or bcrypt are throwing..
         */
        throw new Error(error.message);
    }
};
