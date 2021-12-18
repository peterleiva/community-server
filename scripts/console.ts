import repl from "repl";
import * as factories from "test/factory";
import { DatabaseService } from "services";
import config from "config";

async function start() {
	const db = new DatabaseService();
	await db.start();

	const console = repl.start({
		prompt: "community > ",
	});

	console.context.factories = factories;
	console.context.config = config;
	console.context.db = db.connection;
	console.context.database = console.context.db;

	for (const model in db.connection?.models) {
		console.context[model] = db.connection?.models[model];
	}

	console.on("exit", async () => {
		await db.stop();
	});
}

start();
