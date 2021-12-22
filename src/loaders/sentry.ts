import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import type { Application } from "express";
import config from "config";
import createError from "http-errors";
import { log } from "lib";

type ErrorHandler = () => void;

const isProd = config.env("prod") || config.env("staging");

export default function createSentry(app: Application): ErrorHandler | void {
	const { dsn, tracing, serverName } = config.sentry;

	if (!dsn) {
		const message = "SENTRY_DNS environment variable not set";
		isProd ? log.warn(message) : log.trace(message);

		return;
	}

	Sentry.init({
		dsn,
		serverName,
		environment: config.env(),
		integrations: [
			new Sentry.Integrations.Http({ tracing }),
			new Tracing.Integrations.Express({ app }),
		],

		tracesSampleRate: isProd ? 0.75 : 1.0,
	});

	app.use(
		Sentry.Handlers.requestHandler({
			user: ["id"],
		})
	);

	app.use(Sentry.Handlers.tracingHandler());

	log.info("Sentry started with %s tracing", !tracing ? "no" : "");

	app.get("/debug-sentry", function mainHandler(req, res, next) {
		next(createError(500, "Sentry error debugger"));
	});

	/**
	 * The error handler must be before any other error middleware and after
	 * all controllers
	 */
	return function errorHandler(): void {
		app.use(
			Sentry.Handlers.errorHandler({
				shouldHandleError(error) {
					const { status } = error;
					if (!status) return false;

					return /^(4|5)\d{2}$/.test("" + status);
				},
			})
		);
	};
}
