import bootstrap from "bootstrap";
import { ServerControl } from "services";

export async function createServer(): Promise<ServerControl> {
	return bootstrap({ services: { database: false } });
}
