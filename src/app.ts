import express, { Application, type Request, type Response } from "express";
import config from "config";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { createGraphQL, httpLogger } from "loaders";

export default async function createApp(): Promise<Application> {
	const app = express();

	app.use(httpLogger());
	app.use(helmet());
	app.set("env", config.env("prod", "staging") ? "production" : "development");
	app.use(compression());
	app.use(
		cors({
			origin: [
				/https?:\/\/localhost:(3000|4000)$/,
				"https://studio.apollographql.com",
			],
			methods: ["GET", "POST"],
			maxAge: 600,
		})
	);

	// setup GraphQL
	const graphql = await createGraphQL({
		path: "/api",
		disableHealthCheck: config.env("production"),
	});

	app.use(graphql);

	app.get("/", (req: Request, res: Response) => {
		res.send("Olá, mundo");
	});

	return app;
}
