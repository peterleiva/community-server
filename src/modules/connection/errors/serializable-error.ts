export default class SerializableError extends Error {
	code = "ERR_NOT_SERIALIZABLE";

	constructor() {
		super();

		this.message = "Object is not serializable by JSON API";
	}
}
