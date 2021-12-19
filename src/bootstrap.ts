import config from "config";
import createApp from "app";
import {
	createHttpServer,
	DatabaseOptions,
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
	database?: DatabaseOptions;
}

export async function buildServer(
	options?: ServerControlOptions
): Promise<ServerControl> {
	const app = await createApp();
	const http = createHttpServer(app, config);

	return await http.start({ port: options?.port ?? config.port });
}

export async function buildDatabase({
	url,
}: DatabaseOptions = {}): Promise<DatabaseService> {
	const database = new DatabaseService();
	return await database.start({ url });
}

export default async function bootstrap({
	server,
	database,
}: BootstrapOptions = {}): Promise<BootstrapReturn> {
	const services: Promise<ServiceControl>[] = [
		buildServer(server),
		buildDatabase(database),
	];

	try {
		const running = await Promise.all(services);

		return {
			services: running,

			async stop(): Promise<void> {
				await Promise.all(running.map(s => s.stop({})));
			},
		};
	} catch (error) {
		console.log("Cannot bootstrap the application");
		throw error;
	}
}
