import config from "config";
import createApp from "app";
import {
	createHttpServer,
	DatabaseService,
	ServerControl,
	ServiceControl,
} from "services";

type BootstrapOptions = {
	services: Record<string, boolean>;
};

export async function buildServer(): Promise<ServerControl> {
	const app = await createApp();
	const http = createHttpServer(app, config);
	http.on("started", () => app.set("port", http.port));

	return http.start({ port: config.port });
}

export async function buildDatabase(): Promise<DatabaseService> {
	const database = new DatabaseService();
	return database.start();
}

export async function builder(
	...services: Promise<ServiceControl>[]
): Promise<ServiceControl[]> {
	return Promise.all(services);
}

export default async function bootstrap({
	services: { database = true },
}: BootstrapOptions): Promise<ServerControl> {
	const services: Promise<ServiceControl>[] = [];

	const server = buildServer();
	services.push(server);
	if (database) {
		services.push(buildDatabase());
	}

	builder(...services);

	return server;
}
