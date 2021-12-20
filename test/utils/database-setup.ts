import { DatabaseService } from "services";

export default function databaseSetup(): DatabaseService {
	const url = global.__MONGO_URI__;
	const service = new DatabaseService({ url });

	beforeAll(async () => {
		await service.start();
	});

	beforeEach(async () => {
		await service.cleanup();
	});

	afterAll(async () => {
		await service.stop();
	});

	return service;
}
