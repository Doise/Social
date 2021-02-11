import { decode, sign } from "jsonwebtoken";
import { genSalt, hash } from "bcryptjs";

import config from "../../utils/config";
import User from "../../models/user";

import { IUser } from "../../interfaces/IUser";

/**
 * Generates a jsonwebtoken with the user payload.
 *
 * @todo not tested yet
 *
 * @param { IUser } user The user to store in the payload.
 * @returns { string } A signed json web token.
 */
export const getAuthToken = (user: IUser): string =>
    sign({ id: user.id }, config.jwrSecret, { expiresIn: config.jwrExpiration });

/**
 * decodes the token and gets a user by the jsonwebtoken provided.
 *
 * @todo not tested yet
 *
 * @param { string } token A token with a @IUser payload.
 * @returns { Promise<IUser> } The user.
 */
export const getUserByAuthToken = async (token: string): Promise<IUser> => {
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
    const user = await User.findOne({ _id: userId });

    if (!user) throw new Error("Invalid token.");

    return user;
};

/**
 * Generates encrypted password.
 *
 * @todo not tested yet
 *
 * @param { string } password The password to hash.
 * @returns { Promise<string> } The hashed password.
 */
export const createHashedPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    const hashPass = await hash(password, salt);
    return hashPass;
};
