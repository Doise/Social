import config from "../../utils/config";

describe("Enviroment configurations", () => {
    test("production configurations", () => {
        process.env.NODE_ENV = "production";
        expect(config.isProduction).toBeDefined();
        expect(config.port).toBeDefined();
        expect(config.databaseURL).toBeDefined();
        expect(config.jwrExpiration).toBeDefined();
        expect(config.jwrSecret).toBeDefined();
    });
    
    test("development configurations", () => {
        process.env.NODE_ENV = "development";
        expect(config.isProduction).toBeDefined();
        expect(config.port).toBeDefined();
        expect(config.databaseURL).toBeDefined();
        expect(config.jwrExpiration).toBeDefined();
        expect(config.jwrSecret).toBeDefined();
    });
});
