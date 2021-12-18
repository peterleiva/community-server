import { UserFactory } from "test/factory";
import { databaseSetup } from "test/utils";

databaseSetup();

describe("User", () => {
	it("creates user", async () =>
		await expect(UserFactory.create()).toResolve());
});
