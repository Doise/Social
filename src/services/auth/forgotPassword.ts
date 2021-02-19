import { createTransport } from "nodemailer";
import { IUser, IUserResult } from "../../interfaces/IUser";
import User from "../../models/user";
import config from "../../utils/config";
import { isStrongPassword } from "../../utils/validators";
import { createHashedPassword, serializeUser } from "./auth";

/**
 * Sends an email with a 6 digits onr time password.
 * 
 * @param { string } email The user email.
 * @returns { Promise<IUser> } The user.
 */
export const sendOneTimePassword = async (email: string): Promise<IUser> => {
    /**
     * get the user.
     */
    const user = await User.findOne({ email });

    /**
     * if the user not gound.
     */
    if (!user) throw new Error("Failed. user not found.");

    /**
     * generate and save the otpassword.
     */
    user.oneTimePassword = Math.floor(100000 + Math.random() * 900000);
    await user.save();

    /**
     * Send a mail.
     */
    const transport = createTransport({
        service: "gmail",
        auth: { user: config.mailUser, pass: config.mailSecret },
    });

    await transport.sendMail({
        from: "Social App 📧",
        to: user.email,
        subject: "Your one time password 👀",
        text: `Hi ${user.username}! your one time password is: ${user.oneTimePassword}, this password will be expired after 5 minutes.`,
    });

    return user as IUser;
};

/**
 * Update user password with a valid ont time password.
 *
 * @param { string } email The user email.
 * @param { string } password The user new password.
 * @param { number } oneTimePassword The confirmed one time password.
 * @returns { IUserResult } The updated user and a fresh token.
 */
export const updatePassword = async (
    email: string,
    password: string,
    oneTimePassword: number,
): Promise<IUserResult> => {
    /**
     * get the user.
     */
    const user = await User.findOne({ email });

    /**
     * if the user not found or the otpassword doesm't match.
     */
    if (!user) throw new Error("Failed. user not found.");
    if (user.oneTimePassword && user.oneTimePassword !== oneTimePassword) throw new Error("Failed. bad password.");

    /**
     * update password
     */
    if (password && isStrongPassword(password)) {
        const hashedPass = await createHashedPassword(password);
        user.password = hashedPass;
    } else {
        throw new Error(
            "Password must be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
        );
    }

    const iUser = (await user.save()) as IUser;

    return {
        user: iUser,
        token: serializeUser(iUser.id),
    };
};
