import { ICreateUserInput, IUpdateUserInput } from "../../../interfaces/IUser";
import { updateUser } from "../../../services/auth";
import registerUser from "../../../services/auth/registerUser";
import setupUsersDatabase from "./setup";

setupUsersDatabase("testDatabase");

describe("updateUser", () => {
    let token: string;

    beforeAll(async () => {
        const createUserInput: ICreateUserInput = {
            email: "test@tester.com",
            password: "Ab12$21bA",
            username: "testerChoise",
        };

        token = (await registerUser(createUserInput)).token;
    });

    it("should update email", async () => {
        const updateInput: IUpdateUserInput = {
            token,
            email: "something@else.com",
        };

        const userResult = await updateUser(updateInput);
        const { user } = userResult;

        expect(user.email).toBe("something@else.com");
        expect(user.username).toBe("testerChoise");
        expect(user.status).toBe("");
    });

    it("should throw email error", async () => {
        const updateInput: IUpdateUserInput = {
            token,
            email: "something#else.com",
        };

        await expect(updateUser(updateInput)).rejects.toThrow(/^(Email address is not valid)/);
    });

    it("should update username", async () => {
        const updateInput: IUpdateUserInput = {
            token,
            username: "productionChoise",
        };

        const userResult = await updateUser(updateInput);
        const { user } = userResult;

        expect(user.email).toBe("something@else.com");
        expect(user.username).toBe("productionChoise");
        expect(user.status).toBe("");
    });

    it("should throw username error", async () => {
        const updateInput: IUpdateUserInput = {
            token,
            username: " BO ",
        };

        await expect(updateUser(updateInput)).rejects.toThrow(/^(Username is not valid)/);
    });

    it("should update password", async () => {
        const updateInput: IUpdateUserInput = {
            token,
            password: "pro12To$si",
        };

        await expect(updateUser(updateInput)).resolves.toBeTruthy();
    });

    it("should throw password error", async () => {
        const updateInput: IUpdateUserInput = {
            token,
            password: " BO ",
        };

        await expect(updateUser(updateInput)).rejects.toThrow(/^(Password must be at least)/);
    });

    it("should update status", async () => {
        const updateInput: IUpdateUserInput = {
            token,
            status: "Today's theme: hope",
        };

        const userResult = await updateUser(updateInput);
        const { user } = userResult;

        expect(user.email).toBe("something@else.com");
        expect(user.username).toBe("productionChoise");
        expect(user.status).toBe("Today's theme: hope");
    });
});
