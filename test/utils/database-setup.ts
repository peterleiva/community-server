import { DatabaseService } from "services";

export default function databaseSetup(): DatabaseService {
	const service = new DatabaseService();

	beforeAll(async () => {
		const url = process.env.MONGO_URL;
		await service.start({ url });
	});

	/**
	 * Clean entire database between tests
	 */
	beforeEach(async () => {
		const connection = service?.connection;
		if (!connection) throw `There's no connection to cleanup database`;

		await connection.dropDatabase();
	});

	afterAll(async () => {
		await service.stop();
	});

	return service;
}
