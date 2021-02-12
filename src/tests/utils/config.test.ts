import config from "../../utils/config";

test("Enviroment configurations", () => {
    expect(config.isProduction).toBeDefined();
    expect(config.port).toBeDefined();
    expect(config.databaseURL).toBeDefined();
    expect(config.jwrExpiration).toBeDefined();
    expect(config.jwrSecret).toBeDefined();
});
