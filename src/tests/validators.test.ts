import { isEmail, isStrongPassword, isValidUsername } from "../utils/validators";

test("Email is in valid format", () => {
    expect(isEmail("a.b.c@gmail.com")).toBe(true);
    expect(isEmail("com@com.comcom")).toBe(true);
    expect(isEmail(".abc@g.com")).toBe(true);
    expect(isEmail("aaa123456aaa")).toBe(false);
    expect(isEmail("123@")).toBe(false);
    expect(isEmail("@.com")).toBe(false);
    expect(isEmail("@com.")).toBe(false);
    expect(isEmail(".@gmail.com")).toBe(false);
    expect(isEmail("@@@gmail.com")).toBe(false);
    expect(isEmail("gmail.com@.")).toBe(false);
});

test("Password is strong", () => {
    expect(isStrongPassword("abcdA123@")).toBe(true);
    expect(isStrongPassword("<>123abc4D")).toBe(true);
    expect(isStrongPassword("<>?|'[]{}:;\"~!@#$%^&*()_+-/\\123abc")).toBe(false);
    expect(isStrongPassword("a12345@")).toBe(false);
    expect(isStrongPassword("12345678")).toBe(false);
    expect(isStrongPassword("abcdefgh")).toBe(false);
    expect(isStrongPassword("abcdefgh1234")).toBe(false);
    expect(isStrongPassword("abcdef^^1234")).toBe(false);
    expect(isStrongPassword("^^^^^^^^")).toBe(false);
    expect(isStrongPassword("@123-123")).toBe(false);
});

test("Username is in valid format", () => {
    expect(isValidUsername("abcdA123@")).toBe(true);
    expect(isValidUsername("<>123😀4D")).toBe(true);
    expect(isValidUsername("<>123😀dddddd4D")).toBe(true);
    expect(isValidUsername("noamkantor123")).toBe(true);
    expect(isValidUsername("no_am")).toBe(true);
    expect(isValidUsername("no am")).toBe(false);
    expect(isValidUsername("noam ")).toBe(false);
    expect(isValidUsername(" noam")).toBe(false);
    expect(isValidUsername("noamnoamnoamnoamnoamnoamnoamnoamX")).toBe(false);
    expect(isValidUsername("123456")).toBe(false);
});