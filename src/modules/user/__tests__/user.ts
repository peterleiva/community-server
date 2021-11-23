import { UserFactory } from "factory";
import { databaseSetup } from "utils";
import { Error } from "mongoose";
import UserModel from "../user";

databaseSetup();

describe("User", () => {
	it("creates user", async () =>
		await expect(UserFactory.create()).toResolve());

	describe("Validations", () => {
		it("invalid when nickname has different cases", async () => {
			const nickname = "Some_Nickname";

			await UserFactory.create({ name: { nick: nickname } });

			const user2 = UserFactory.build({
				name: { nick: nickname.toUpperCase() },
			});

			await expect(UserModel.validate(user2)).rejects.toBeInstanceOf(
				Error.ValidationError
			);
		});
	});
});
