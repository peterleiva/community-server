import { UserFactory } from "factory";
import { databaseSetup } from "utils";

databaseSetup();

describe("User", () => {
	it("creates user", async () =>
		await expect(UserFactory.create()).toResolve());
});
