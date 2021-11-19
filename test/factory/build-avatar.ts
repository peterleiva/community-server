import { Avatar } from "modules/user/schema";
import { randomBytes } from "crypto";
import { createHash } from "crypto";

type AvatarOverrides = Partial<Avatar>;

export default function buildAvatar(source: AvatarOverrides = {}): Avatar {
	const bin = randomBytes(1024 * 4);
	const hash = createHash("md5");

	hash.update(bin);

	return {
		...source,
		binImage: bin,
		digest: hash.digest("hex"),
	};
}
