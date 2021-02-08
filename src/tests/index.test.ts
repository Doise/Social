import { JWT_LIFE_TIME, JWT_SECRET, MONGODB_URI, PORT } from "../utils/config";
import { HelloWorld } from "../index";

test("Enviroment configurations", () => {
    expect(JWT_LIFE_TIME).toBeDefined();
    expect(JWT_SECRET).toBeDefined();
    expect(MONGODB_URI).toBeDefined();
    expect(PORT).toBeDefined();
});

test("index.ts", () => {
    expect(HelloWorld("Doise")).toBe("Hello Doise");
});
