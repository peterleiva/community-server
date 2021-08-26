import pino, { HttpLogger } from "pino-http";
import { logger } from "lib";

export default function createHttpLogger(): HttpLogger {
	return pino({
		name: "HTTP Messages",
		logger,
	});
}
