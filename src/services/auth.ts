import { sign } from "jsonwebtoken";
import { compare, genSalt, hash } from "bcryptjs";

import config from "../utils/config";
import Logger from "../utils/logger";
import User from "../models/user";

import { ILoginUserResult, ICreateUserInput, IUser, ILoginUserInput } from "../interfaces/IUser";
import { isEmail, isStrongPassword } from "../utils/validators";

/**
 * Generates a jsonwebtoken with the user payload.
 *
 * @todo not tested yet
 *
 * @param { IUser } user The user to store in the payload.
 * @returns { string } A signed json web token.
 */
export const getAuthToken = (user: IUser): string => {
    /**
     * make the payload.
     */
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    /**
     * sign the token with a secret and expiration date.
     */
    return sign(payload, config.jwrSecret, { expiresIn: config.jwrExpiration });
};

/**
 * Registers new user.
 * Constructs a new user in the database and generates a token.
 *
 * @todo not tested yet
 *
 * @param { ICreateUserInput } registerInput User properties to construct a user from.
 * @returns { Promise<ILoginUserResult> } The user that created and a json web token.
 */
export const registerUser = async (registerInput: ICreateUserInput): Promise<ILoginUserResult> => {
    /**
     * validate email.
     */
    if (!isEmail(registerInput.email)) throw new Error("Email address is not valid.");

    /**
     * validate username.
     */
    if (registerInput.username.length < 4) throw new Error("Username must be at least 4 characters.");

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
        const salt = await genSalt(10);
        const hashPassword = await hash(config.bcryptSecret, salt);

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

/**
 * Generates a fresh jsonwebtoken for a given user.
 *
 * @todo not tested yet
 *
 * @param { ILoginUserInput } loginUserInput The user identity (username/email) and the password.
 * @returns { Promise<ILoginUserResult> } The requested user and a json web token.
 */
export const getUserAuthToken = async (loginUserInput: ILoginUserInput): Promise<ILoginUserResult> => {
    try {
        /**
         * find the user by his identity (username or email).
         */
        const user = await User.findOne({
            $or: [{ email: loginUserInput.identity }, { username: loginUserInput.identity }],
        });

        /**
         * compare the password with the stored hash.
         */
        if (!user || !compare(loginUserInput.password, user.password)) {
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
        Logger.error(`auth.registerUser => ${error.message}`);
        throw new Error(`Failed to register user: ${error.message}`);
    }
};
