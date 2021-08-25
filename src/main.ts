import { createHttpServer, ServerControl } from "server";
import config from "config";
import createApp from "app";

export async function main(): Promise<void> {
	const app = await createApp();
	const controller: ServerControl = createHttpServer(app, config);
	controller.on("started", () => app.set("port", controller.port));
	await controller.start({ port: config.port });
}

main();
