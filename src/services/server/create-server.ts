import { createServer, RequestListener } from "http";
import type { Config } from "config";
import { runningLogger, errorListener } from "./handlers";
import ServerControl from "./server-control";

export function createHttpServer(
	app: RequestListener,
	config: Config
): ServerControl {
	const server = createServer(app);
	const httpController = new ServerControl(server);

	// TODO: tirar comportamento de logger e error da criação do servidor
	httpController.on("started", runningLogger(httpController, config));
	httpController.on("error", errorListener(httpController));

	return httpController;
}
