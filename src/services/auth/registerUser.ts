import Logger from "../../utils/logger";
import User from "../../models/user";

import { ILoginUserResult, ICreateUserInput } from "../../interfaces/IUser";
import { isEmail, isStrongPassword, isValidUsername } from "../../utils/validators";
import { createHashedPassword, getAuthToken } from "./auth";

/**
 * Registers new user.
 * Constructs a new user in the database and generates a token.
 *
 * @param { ICreateUserInput } registerInput User properties to construct a user from.
 * @returns { Promise<ILoginUserResult> } The user that created and a fresh generated json web token.
 */
export default async (registerInput: ICreateUserInput): Promise<ILoginUserResult> => {
    /**
     * validate email.
     */
    if (!isEmail(registerInput.email)) throw new Error("Email address is not valid.");

    /**
     * validate username.
     */
    if (!isValidUsername(registerInput.username)) throw new Error("Username is not valid.");

    /**
     * validate password.
     */
    if (!isStrongPassword(registerInput.password))
        throw new Error(
            "Password must be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
        );

    /**
     * gnerate hashed password.
     */
    try {
        const hashPassword = await createHashedPassword(registerInput.password);

        /**
         * create new user.
         */
        const doc: ICreateUserInput = {
            email: registerInput.email,
            username: registerInput.username,
            password: hashPassword,
        };

        /**
         * save the user in the database.
         */
        const user = new User(doc);
        await user.save();

        return {
            user,
            token: getAuthToken(user),
        };
    } catch (error) {
        /**
         * throw a duplicate email error.
         */
        if (error.message && `${error.message}`.includes("email_1 dup key:")) {
            throw new Error("Email address is already exists");
        }

        /**
         * throw a duplicate username error.
         */
        if (error.message && `${error.message}`.includes("username_1 dup key:")) {
            throw new Error("Username is already exists");
        }

        /**
         * may be that mongoose or bcrypt are throwing..
         */
        Logger.error(`auth.registerUser => ${error.message}`);
        throw new Error(`Failed to register user: ${error.message}`);
    }
};
