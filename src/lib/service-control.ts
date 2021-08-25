import { EventEmitter } from "stream";

export default abstract class ServiceControl<
	TOptions = undefined
> extends EventEmitter {
	abstract running: boolean;
	abstract start(options: TOptions): Promise<this>;
	abstract stop(options: TOptions): Promise<this>;

	async restart(options: TOptions): Promise<this> {
		if (this.running) {
			await this.stop(options);
		}

		await this.start(options);

		return this;
	}
}
