import config from "config";
import createApp from "app";
import { createHttpServer, DatabaseService } from "services";

export async function main(): Promise<void> {
	const app = await createApp();
	const http = createHttpServer(app, config);
	const database = new DatabaseService();

	http.on("started", () => app.set("port", http.port));

	Promise.all([http.start({ port: config.port }), database.start()]);
}

main().catch(console.error);
