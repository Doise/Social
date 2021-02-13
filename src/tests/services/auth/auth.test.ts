import { ICreateUserInput } from "../../../interfaces/IUser";
import User from "../../../models/user";
import { deserializeUser, serializeUser } from "../../../services/auth/auth";
import registerUser from "../../../services/auth/registerUser";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

describe("serializeUser", () => {
    let token: string;

    beforeAll(() => {
        /* eslint no-underscore-dangle: "off" */
        token = serializeUser("123456");
    });

    it("shoud be defined", () => {
        expect(token).toBeDefined();
    });

    it("should throw invalid user", async () => {
        await expect(deserializeUser("123456")).rejects.toThrow(/^(Invalid token)/);
    }, 12000);

    it("shoud throw 'Invalid token'.", async () => {
        const userInput: ICreateUserInput = {
            email: "test@gmail.com",
            username: "test",
            password: "tesT$1234",
        };

        const loginResult = await registerUser(userInput);

        await User.deleteMany({ email: userInput.email });

        await expect(deserializeUser(loginResult.token)).rejects.toThrow(/^(Invalid token)/);
    }, 20000);
});
