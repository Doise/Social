/**
 * Checks the format of a given email address,
 * A valid format would be something like "Doise@gmail.com".
 *
 * @param { string } email The email to validate
 * @returns { boolean } True if the email is valid.
 */
export const isEmail = (email: string): boolean => {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return regex.test(email);
};

/**
 * Checks if a password is strong.
 * Strong passwords got:
 * - at least 8 characters
 * - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
 * - Can contain special characters
 *
 * @param { string } password The password to validate.
 * @returns { boolean } True if the password is valid.
 */
export const isStrongPassword = (password: string): boolean => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return regex.test(password);
};
