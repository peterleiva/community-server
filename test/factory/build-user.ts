import casual from "casual";
import { User, Naming, Avatar } from "modules/user/schema";
import buildAvatar from "./build-avatar";
import { merge } from "lodash";

type UserOverrides = Partial<{
	name: Partial<Naming>;
	avatar: Partial<Avatar>;
}>;

export default function buildUser(
	source: UserOverrides = {}
): Omit<User, "createdAt" | "updatedAt"> {
	return merge(
		{
			name: {
				first: casual.first_name,
				last: casual.last_name,
				nick: casual.username,
			},

			avatar: buildAvatar(),
		},
		source
	);
}
