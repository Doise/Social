import { createTestClient } from "apollo-server-testing";
import { ICreateUserInput, IUser } from "../../../interfaces/IUser";
import registerUser from "../../../services/auth/registerUser";
import { getServer } from "../../../utils/server";
import setupUsersDatabase from "../../services/auth/setup";
import { CREATE_USER, GET_USER, LOGIN_USER, UPDATE_USER } from "./queries";

setupUsersDatabase("testDatabase");

describe("graphql.user", () => {
    let user: IUser;
    let token: string;

    beforeAll(async () => {
        const userInput: ICreateUserInput = {
            email: "test123@gmail.co.il",
            username: "tester123",
            password: "Test3r!to",
        };

        const result = await registerUser(userInput);
        user = result.user;
        token = result.token;
    });

    it("sould return a user", async () => {
        const server = getServer();

        const { query } = createTestClient(server);

        const { data } = await query({
            query: GET_USER,
            variables: { id: user.id },
        });

        expect(data.user.username).toBe("tester123");
    });

    it("sould throw error", async () => {
        const server = getServer();

        const { query } = createTestClient(server);

        const { data, errors } = await query({
            query: GET_USER,
            variables: { id: "user.id" },
        });

        expect(data).toBeNull();
        expect(errors).toBeTruthy();
    });

    it("sould return a valid token", async () => {
        const server = getServer();

        const { mutate } = createTestClient(server);

        const { data } = await mutate({
            mutation: LOGIN_USER,
            variables: {
                identity: user.email,
                password: "Test3r!to",
            },
        });

        expect(data.loginUser.user.username).toBe("tester123");
        expect(data.loginUser.token.length).toBeGreaterThan(20);
    });

    it("sould update user", async () => {
        const server = getServer();

        const { mutate } = createTestClient(server);

        const { data } = await mutate({
            mutation: UPDATE_USER,
            variables: {
                updateUserInput: {
                    token,
                    status: "Well DONE! 😎",
                },
            },
        });

        expect(data.updateUser.user.status).toBe("Well DONE! 😎");
        expect(data.updateUser.token.length).toBeGreaterThan(20);
    });

    it("sould register a user", async () => {
        const server = getServer();

        const { mutate } = createTestClient(server);

        const { data } = await mutate({
            mutation: CREATE_USER,
            variables: {
                createUserInput: {
                    username: "steveJobs",
                    email: "steve@gmail.com",
                    password: "shHht3ve!",
                },
            },
        });

        expect(data.createUser.user.username).toBe("steveJobs");
        expect(data.createUser.user.status).toBe("");
        expect(data.createUser.user.email).toBe("steve@gmail.com");
        expect(data.createUser.token.length).toBeGreaterThan(20);
    });
});
