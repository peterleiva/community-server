import pino, { HttpLogger } from "pino-http";
import { log as logger } from "lib";

export default function createHttpLogger(): HttpLogger {
	return pino({
		name: "HTTP Messages",
		logger,
	});
}
