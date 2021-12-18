import { buildServer } from "bootstrap";
import { ServerControl } from "services";

export async function createServer(): Promise<ServerControl> {
	const server = buildServer();
	return server;
}
