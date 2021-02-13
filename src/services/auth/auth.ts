import { decode, sign } from "jsonwebtoken";
import { genSalt, hash } from "bcryptjs";

import config from "../../utils/config";
import User from "../../models/user";

import { IUserBase } from "../../interfaces/IUser";

/**
 * Generates a jsonwebtoken with the user payload.
 *
 * @param { string } userId The user _id to store in the payload.
 * @returns { string } A signed json web token.
 */
export const serializeUser = (userId: string): string =>
    sign({ id: userId }, config.jwrSecret, { expiresIn: config.jwrExpiration });

/**
 * decodes the token and gets a user by the jsonwebtoken provided.
 *
 * @param { string } token A token with a @IUser payload.
 * @returns { Promise<IUserBase> } The user.
 */
export const deserializeUser = async (token: string): Promise<IUserBase> => {
    /**
     * verify the token.
     */
    let userId = "";

    try {
        const { id } = decode(token) as { id: string };
        userId = id;
    } catch (error) {
        throw new Error("Invalid token.");
    }

    /**
     * find the user.
     */
    const user = await User.findById(userId);

    if (!user) throw new Error("Invalid token.");

    return user;
};

/**
 * Generates encrypted password.
 *
 * @param { string } password The password to hash.
 * @returns { Promise<string> } The hashed password.
 */
export const createHashedPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    const hashPass = await hash(password, salt);
    return hashPass;
};
