import express, { Application } from "express";
// import createError from "http-errors";
import type { Request, Response } from "express";
import config from "config";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { createGraphQL, DatabaseService } from "loaders";

export default async function createApp(): Promise<Application> {
	const app = express();

	app.use(helmet());
	app.set(
		"env",
		config.env("prod") || config.env("staging") ? "production" : "development"
	);
	app.use(compression());
	app.use(cors());

	const database = new DatabaseService();
	database.start();

	// setup GraphQL
	const graphql = await createGraphQL({
		path: "/api",
		disableHealthCheck: config.env("production") as boolean,
	});
	app.use(graphql);

	app.get("/", (req: Request, res: Response) => {
		res.send("Olá, mundo");
	});

	return app;
}
