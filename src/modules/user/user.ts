import { model } from "mongoose";
import { schema, User } from "./schema";

const UserModel = model<User>("User", schema);

export default UserModel;
