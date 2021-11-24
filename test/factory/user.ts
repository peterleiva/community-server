import casual from "casual";
import { Factory } from "fishery";
import AvatarFactory from "./avatar";
import { UserModel, UserDocument, User } from "modules/user";

type UserData = Partial<User>;

export default Factory.define<UserData, never, UserDocument>(({ onCreate }) => {
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
