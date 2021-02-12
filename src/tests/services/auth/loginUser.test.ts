import { ICreateUserInput, ILoginUserInput } from "../../../interfaces/IUser";
import { registerUser } from "../../../services/auth";
import loginUser from "../../../services/auth/loginUser";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

beforeAll(async () => {
    const userInput: ICreateUserInput = {
        email: "test@social.com",
        username: "tester",
        password: "Tester$s0cial",
    };
    
    await registerUser(userInput);
});

test("Login with email should return user and token.", async () => {
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

test("Login with username should return user and token.", async () => {
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


test("Login with wrong username should throw.", async () => {
    const loginInput: ILoginUserInput = {
        identity: "unknown",
        password: "Tester$s0cial",
    };

    // await expect(registerUser(userInput)).rejects.toThrow(/^(Username)/);
    await expect(loginUser(loginInput)).rejects.toThrow(/^(Bad username\/password)/);
});