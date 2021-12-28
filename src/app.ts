import express, { Application, type ErrorRequestHandler } from "express";
import config from "config";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { createGraphQL, httpLogger, createSentry } from "loaders";

export default async function createApp(): Promise<Application> {
	const app = express();
	const sentryErrorHandler = createSentry(app);

	app.use(httpLogger());
	app.use(helmet());
	app.set("env", config.env("prod", "staging") ? "production" : "development");
	app.use(compression());
	app.use(express.static("public"));
	app.use(
		cors({
			origin: [/https?:\/\/localhost:\d+$/, "https://studio.apollographql.com"],
			methods: ["GET", "POST"],
			maxAge: 600,
		})
	);

	const graphql = await createGraphQL({
		path: "/api",
		disableHealthCheck: config.env("production"),
	});

	app.use(graphql);

	sentryErrorHandler?.();

	const logErrors: ErrorRequestHandler = (err, req, res, next) => {
		log.error(err);
		next(err);
	};

	app.use(logErrors);

	return app;
}
