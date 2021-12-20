import dotenv from "dotenv";
import { env } from "node-environment";

const result = dotenv.config();
if (result.error && env("dev")) {
	console.debug("🚨 Failed to parser /.env file");
}

const parseBoolean = (value: string | undefined): boolean =>
	["true", "1"].some(v => v === value?.toLowerCase());

const config = {
	port: +(process.env.PORT ?? "3000"),
	logLevel: process.env.LOG_LEVEL ?? "info",
	databaseUrl: process.env.DATABASE_URL,
	env,
	noLog: parseBoolean(process.env.NO_LOG),
	sentry: {
		dsn: process.env.SENTRY_DSN,
		tracing: parseBoolean(process.env.SENTRY_TRACING),
	},
};

export type Config = typeof config;

export default config;
