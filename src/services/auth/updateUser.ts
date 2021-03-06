import { createHashedPassword, deserializeUser, serializeUser } from "./auth";
import { IUpdateUserInput, IUserResult } from "../../interfaces/IUser";
import { isEmail, isStrongPassword, isValidUsername } from "../../utils/validators";
/**
 * Updates a registered user.
 *
 * @todo not tested yet
 *
 * @param { IUpdateUserInput } updateUserInput The user properties to update.
 * @returns { Promise<IUserResult> } The updated user and a fresh generated json web token.
 */
export default async (updateUserInput: IUpdateUserInput): Promise<IUserResult> => {
    /**
     * decrypt the token and find the user.
     */
    const user = await deserializeUser(updateUserInput.token);

    /**
     * update username if provided.
     */
    if (updateUserInput.username) {
        if (updateUserInput.username !== "" && isValidUsername(updateUserInput.username)) {
            user.username = updateUserInput.username;
        } else {
            throw new Error("Username is not valid.");
        }
    }

    /**
     * update email if provided.
     */
    if (updateUserInput.email) {
        if (updateUserInput.email !== "" && isEmail(updateUserInput.email)) {
            user.email = updateUserInput.email;
        } else {
            throw new Error("Email address is not valid.");
        }
    }

    /**
     * update status if provided.
     */
    if (updateUserInput.status) user.status = updateUserInput.status;

    /**
     * update password if provided.
     */
    if (updateUserInput.password) {
        if (updateUserInput.password !== "" && isStrongPassword(updateUserInput.password)) {
            const hashedPass = await createHashedPassword(updateUserInput.password);
            user.password = hashedPass;
        } else {
            throw new Error(
                "Password must be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
            );
        }
    }

    /**
     * save the changes.
     */
    await user.save();

    /**
     * return the user and a fresh generated token.
     */
    return {
        user,
        /* eslint no-underscore-dangle: "off" */
        token: serializeUser(user._id),
    };
};
