import config from "config";
import createApp from "app";
import {
	createHttpServer,
	DatabaseService,
	ServerControl,
	ServerControlOptions,
	ServiceControl,
} from "services";

interface BootstrapReturn {
	services: ServiceControl<unknown>[];
	stop(): Promise<void>;
}

interface BootstrapOptions {
	server?: ServerControlOptions;
}

export async function buildServer(
	options?: ServerControlOptions
): Promise<ServerControl> {
	const app = await createApp();
	const http = createHttpServer(app, config);
	http.on("started", () => app.set("port", http.port));

	return http.start({ port: options?.port ?? config.port });
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
	server,
}: BootstrapOptions = {}): Promise<BootstrapReturn> {
	const services: Promise<ServiceControl>[] = [];

	services.push(buildServer(server));
	services.push(buildDatabase());

	const running = await builder(...services);

	return {
		services: running,
		async stop(): Promise<void> {
			running.forEach(s => s.stop({}));
		},
	};
}
