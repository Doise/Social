import { disconnect, ConnectOptions, connect } from "mongoose";
import { ICreateUserInput } from "../../../interfaces/IUser";
import { registerUser } from "../../../services/auth";
import config from "../../../utils/config";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

describe("registerUser", () => {
    it("shoud throw email exception.", async () => {
        const userInput: ICreateUserInput = {
            email: "",
            username: "",
            password: "",
        };

        await expect(registerUser(userInput)).rejects.toThrow(/^(Email)/);
    });

    it("shoud throw username exception.", async () => {
        const userInput: ICreateUserInput = {
            email: "test@gmail.com",
            username: "",
            password: "",
        };

        await expect(registerUser(userInput)).rejects.toThrow(/^(Username)/);
    });

    it("shoud throw password exception.", async () => {
        const userInput: ICreateUserInput = {
            email: "test@gmail.com",
            username: "test",
            password: "",
        };

        await expect(registerUser(userInput)).rejects.toThrow(/^(Password)/);
    });

    it("shoud return a user and a token.", async () => {
        const userInput: ICreateUserInput = {
            email: "test@gmail.com",
            username: "test",
            password: "tesT$1234",
        };

        const loginResult = await registerUser(userInput);

        expect(loginResult.user.email).toBe(userInput.email);
        expect(loginResult.user.username).toBe(userInput.username);
        expect(loginResult.user.status).toBeFalsy();
        expect(loginResult.token.length).toBeGreaterThan(20);
    });

    it("shoud return a user and a status.", async () => {
        const userInput: ICreateUserInput = {
            email: "marco@gmail.com",
            username: "marco854",
            password: "marco%M4rc0",
            status: "Where is mommy?",
        };

        const loginResult = await registerUser(userInput);

        expect(loginResult.user.status).toBe(userInput.status);
    });

    it("shoud throw a 'Email address is already exists' error.", async () => {
        const userInput: ICreateUserInput = {
            email: "same-email@gmail.com",
            username: "username",
            password: "tesT$1234",
        };

        const copycatUserInput: ICreateUserInput = {
            email: "same-email@gmail.com",
            username: "differentUsername",
            password: "tesT$1234",
        };

        await registerUser(userInput);
        const register = registerUser(copycatUserInput);
        await expect(register).rejects.toThrow(/(Email address is already exists)/);
    });

    it("shoud throw a 'Username is already exists' error.", async () => {
        const user1: ICreateUserInput = {
            email: "email@gmail.com",
            username: "sameusername",
            password: "tesT$1234",
        };

        const user2: ICreateUserInput = {
            email: "different-email@gmail.com",
            username: "sameusername",
            password: "tesT$1234",
        };

        await registerUser(user1);
        const user = registerUser(user2);
        await expect(user).rejects.toThrow(/(Username is already exists)/);
    });
});

describe("registerUser when mongo connection breaks", () => {
    it("shoud throw a 'Error: Failed to register'", async () => {
        jest.setTimeout(30_000);

        const user: ICreateUserInput = {
            email: "new-email@gmail.com",
            username: "new-username",
            password: "tesT$1234",
        };

        await disconnect();
        await expect(registerUser(user)).rejects.toThrow(/(Error: Failed to register)/);

        const connectOptions: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        };

        await connect(config.databaseURL.replace("<dbname>", "testDatabase"), connectOptions);
    });
});
