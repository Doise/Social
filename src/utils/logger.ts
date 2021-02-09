import { createLogger, transports, format } from "winston";
import config from "./config";

const logger = createLogger({
    format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
    transports: [
        new transports.Console({
            format: format.cli(),
        }),
    ],
});

if (config.isProduction) {
    logger.add(new transports.File({ filename: "logger.log" }));
}

export default logger;
