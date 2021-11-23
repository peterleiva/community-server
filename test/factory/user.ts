import casual from "casual";
import { User } from "modules/user/schema";
import { Factory } from "fishery";
import AvatarFactory from "./avatar";
import { UserModel } from "modules/user";

type UserData = Partial<User>;

export default Factory.define<UserData, never, User>(({ onCreate }) => {
	onCreate(async user => {
		const userDoc = new UserModel(user);
		await userDoc.save();

		return userDoc;
	});

	const user = {
		name: {
			first: casual.first_name,
			last: casual.last_name,
			nick: casual.username,
		},

		avatar: AvatarFactory.build(),
	};

	return user;
});
