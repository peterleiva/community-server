import UserModel from "../user";
import { buildUser } from "factory";
import { databaseSetup } from "utils";
import { Error } from "mongoose";

databaseSetup();

describe("User", () => {
	it("creates user", async () => {
		const user = buildUser();
		const doc = new UserModel(user);

		await expect(doc.save()).resolves.toMatchObject(user);
	});

	describe("Validations", () => {
		it("invalid when nickname has different cases", async () => {
			const nickname = "Some_Nickname";

			const user1 = buildUser({ name: { nick: nickname } });
			const user2 = buildUser({ name: { nick: nickname.toUpperCase() } });

			await UserModel.create(user1);

			await expect(UserModel.validate(user2)).rejects.toBeInstanceOf(
				Error.ValidationError
			);
		});
	});
});
