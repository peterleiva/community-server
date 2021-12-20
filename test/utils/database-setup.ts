import { DatabaseService } from "services";
import { MongoMemoryServer } from "mongodb-memory-server";

export default function databaseSetup() {
	const server = new MongoMemoryServer({
		instance: {},
		binary: {
			checkMD5: true,
		},
	});

	let service: DatabaseService;

	beforeAll(async () => {
		await server.start();

		service = new DatabaseService({ url: server.getUri() });
		await service.start();
	});

	beforeEach(async () => {
		await service.cleanup();
	});

	afterAll(async () => {
		await service.stop();
		await server.stop();
	});
}
