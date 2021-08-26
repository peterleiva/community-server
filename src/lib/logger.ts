import pino from "pino";
import config from "config";

const logger = pino({
	prettyPrint: !!config.env("development"),
	level: config.logLevel,
});

export default logger;
