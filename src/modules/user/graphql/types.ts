import type { Node } from "modules/connection";
import type { User } from "../schema";

export interface UserType extends Omit<User, "avatar">, Node {
	avatar: string;
}
