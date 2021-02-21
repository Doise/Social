module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    slowTestThreshold: 10,
    testMatch: ["**/?(*.)+(spec|test).ts"],
};
