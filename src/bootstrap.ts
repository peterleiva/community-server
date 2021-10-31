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

export default async function bootstrap({
	services: { database = true },
}: BootstrapOptions): Promise<ServerControl> {
	const app = await createApp();
	const http = createHttpServer(app, config);
	const services: Promise<ServiceControl>[] = [];

	services.push(http.start({ port: config.port }));

	if (database) {
		const dbControl = new DatabaseService();
		services.push(dbControl.start());
	}

	http.on("started", () => app.set("port", http.port));

	Promise.all(services);

	return http;
}
