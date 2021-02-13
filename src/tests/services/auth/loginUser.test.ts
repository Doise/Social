import { ICreateUserInput, ILoginUserInput } from "../../../interfaces/IUser";
import { registerUser } from "../../../services/auth";
import loginUser from "../../../services/auth/loginUser";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

describe("loginUser", () => {
    beforeAll(async () => {
        const userInput: ICreateUserInput = {
            email: "test@social.com",
            username: "tester",
            password: "Tester$s0cial",
        };

        await registerUser(userInput);
    });

    it("should return user and token by email.", async () => {
        const loginInput: ILoginUserInput = {
            identity: "test@social.com",
            password: "Tester$s0cial",
        };
        
        const loginResult = await loginUser(loginInput);
        
        expect(loginResult.user.username).toBe("tester");
        expect(loginResult.user.email).toBe("test@social.com");
        expect(loginResult.user.status).toBe("");
        expect(loginResult.token).toBeTruthy();
        expect(loginResult.token).not.toBe("");
    });

    it("should return user and token by username.", async () => {
        const loginInput: ILoginUserInput = {
            identity: "tester",
            password: "Tester$s0cial",
        };
        
        const loginResult = await loginUser(loginInput);
        
        expect(loginResult.user.username).toBe("tester");
        expect(loginResult.user.email).toBe("test@social.com");
        expect(loginResult.user.status).toBe("");
        expect(loginResult.token).toBeTruthy();
        expect(loginResult.token).not.toBe("");
    });

    it("should throw Bad username.", async () => {
        const loginInput: ILoginUserInput = {
            identity: "unknown",
            password: "Tester$s0cial",
        };
        
        await expect(loginUser(loginInput)).rejects.toThrow(/^(Bad username\/password)/);
    });

    it("should throw Bad password.", async () => {
        const loginInput: ILoginUserInput = {
            identity: "tester",
            password: "nope",
        };
        
        await expect(loginUser(loginInput)).rejects.toThrow(/^(Bad username\/password)/);
    });
});
