import config from "../utils/config";

test("Enviroment configurations", () => {
    expect(config.jwrExpiration).toBeDefined();
    expect(config.jwrSecret).toBeDefined();
    expect(config.databaseURL).toBeDefined();
    expect(config.port).toBeDefined();
});
