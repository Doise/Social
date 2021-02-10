import { connect, connection, ConnectOptions } from "mongoose";
import User from "../models/user";
import config from "../utils/config";
import logger from "../utils/logger";
import { ICreateUserInput } from "../interfaces/IUser";
import { registerUser } from "../services/auth";

beforeAll(async () => {
    jest.setTimeout(20_000);

    const connectOptions: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

    await connect(config.databaseURL, connectOptions);

    connection.useDb("testDatabase");

    connection.on("error", logger.error);

    connection.once("open", () => {
        logger.info("Database is connected. 👍👍");
    });
});

afterAll(async () => {
    await User.collection.drop();
    await connection.close();
});

afterEach(async () => {
    await User.deleteMany().exec();
});

test("Register user shoud throw email exception.", async () => {
    const userInput: ICreateUserInput = {
        email: "",
        username: "",
        password: "",
    };

    await expect(registerUser(userInput)).rejects.toThrow(/^(Email)/);
});

test("Register user shoud throw username exception.", async () => {
    const userInput: ICreateUserInput = {
        email: "test@gmail.com",
        username: "",
        password: "",
    };

    await expect(registerUser(userInput)).rejects.toThrow(/^(Username)/);
});

test("Register user shoud throw password exception.", async () => {
    const userInput: ICreateUserInput = {
        email: "test@gmail.com",
        username: "test",
        password: "",
    };

    await expect(registerUser(userInput)).rejects.toThrow(/^(Password)/);
});

test("Register user shoud return a user and a token.", async () => {
    const userInput: ICreateUserInput = {
        email: "test@gmail.com",
        username: "test",
        password: "tesT$1234",
    };

    const loginResult = await registerUser(userInput);

    expect(loginResult.user.email).toBe(userInput.email);
    expect(loginResult.user.password.length).toBeGreaterThan(10);
    expect(loginResult.user.username).toBe(userInput.username);
    expect(loginResult.user.status).toBeFalsy();
    expect(loginResult.user.id.length).toBeGreaterThan(5);
    expect(loginResult.token.length).toBeGreaterThan(20);
});

test("Register with the same email twice shoud throw an error.", async () => {
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

    await expect(registerUser(userInput)).resolves.toBeTruthy();
    await expect(registerUser(copycatUserInput)).rejects.toThrow(/(Email address is already exists)/);
});

test("Register with the same username twice shoud throw an error.", async () => {
    const userInput: ICreateUserInput = {
        email: "email@gmail.com",
        username: "sameusername",
        password: "tesT$1234",
    };

    const copycatUserInput: ICreateUserInput = {
        email: "different-email@gmail.com",
        username: "sameusername",
        password: "tesT$1234",
    };

    await expect(registerUser(userInput)).resolves.toBeTruthy();
    await expect(registerUser(copycatUserInput)).rejects.toThrow(/(Username is already exists)/);
});
