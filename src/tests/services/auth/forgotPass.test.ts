import { ICreateUserInput, IUser } from "../../../interfaces/IUser";
import { sendOneTimePassword } from "../../../services/auth/forgotPassword";
import registerUser from "../../../services/auth/registerUser";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

describe("forgotPass", () => {
    let user: IUser;

    beforeAll(async () => {
        const createUserInput: ICreateUserInput = {
            email: "kantor96@gmail.com",
            password: "Ab12$21bA",
            username: "testerChoise",
        };

        const result = await registerUser(createUserInput);
        user = result.user;
    });

    it("should send an email'.", async () => {
        const result = await sendOneTimePassword(user.email);

        expect(result.email).toBeTruthy();
    }, 20000);
});
