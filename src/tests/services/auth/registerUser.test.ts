import { ICreateUserInput } from "../../../interfaces/IUser";
import { registerUser } from "../../../services/auth";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

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

    await registerUser(userInput);
    await expect(registerUser(copycatUserInput)).rejects.toThrow(/(Email address is already exists)/);
});

test("Register with the same username twice shoud throw an error.", async () => {
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
