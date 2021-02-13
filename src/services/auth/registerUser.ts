import User from "../../models/user";

import { IUserResult, ICreateUserInput } from "../../interfaces/IUser";
import { isEmail, isStrongPassword, isValidUsername } from "../../utils/validators";
import { createHashedPassword, serializeUser } from "./auth";

/**
 * Registers new user.
 * Constructs a new user in the database and generates a token.
 *
 * @param { ICreateUserInput } registerInput User properties to construct a user from.
 * @returns { Promise<IUserResult> } The user that created and a fresh generated json web token.
 */
export default async (registerInput: ICreateUserInput): Promise<IUserResult> => {
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
            status: registerInput.status ? registerInput.status : "",
        };

        /**
         * save the user in the database.
         */
        const user = await new User(doc).save();

        return {
            user,
            /* eslint no-underscore-dangle: "off" */
            token: serializeUser(user._id),
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
        throw new Error(`Error: Failed to register user: ${error.message}`);
    }
};
