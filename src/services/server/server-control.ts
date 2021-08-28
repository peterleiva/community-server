import type { Server } from "http";
import { AddressInfo } from "net";
import ServiceControl from "services/service-control";
import ServiceControlEvents from "./events.interface";
import { log } from "lib";

type ControlOptions = {
	port: number;
};

export default class ServerControl
	extends ServiceControl<ControlOptions>
	implements ServiceControlEvents
{
	readonly #server: Server;
	#port: number | null;

	constructor(server: Server) {
		super();
		this.#server = server;
		this.#port = null;

		this.#server.on("error", error => this.emit("error", error));
		this.#server.on("listening", () => this.emit("started", this.#server));
	}

	get server(): Server {
		return this.#server;
	}

	get running(): boolean {
		return this.#server.listening;
	}

	get port(): number | null {
		if (!this.running) {
			return null;
		}

		return this.#port;
	}

	async start({ port }: ControlOptions): Promise<this> {
		this.emit("starting", this.#server);

		return new Promise(resolve => {
			this.#server.listen(port, () => {
				resolve(this);
			});

			this.#port =
				port === 0 ? (this.#server.address() as AddressInfo).port : port;
		});
	}

	async stop(): Promise<this> {
		return new Promise((resolve, reject) => {
			if (this.running) {
				this.#server.close(err => {
					if (err) {
						log.error(`Error closing the http server`);
						reject(err);
					}
					this.emit("stopped");
					log.info(`❌ Http server closed`);
					resolve(this);
				});
			}
		});
	}
}
