import { Avatar } from "modules/user/schema";
import { randomBytes, createHash } from "crypto";
import { Factory } from "fishery";

export default Factory.define<Avatar>(() => {
	const bin = randomBytes(1024 * 4);
	const hash = createHash("md5");

	hash.update(bin);

	return {
		binImage: bin,
		digest: hash.digest("hex"),
	};
});
