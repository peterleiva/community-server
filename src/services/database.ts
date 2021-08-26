import mongoose, { Connection, Mongoose } from "mongoose";
import ServiceControl from "./service-control";
import config from "config";
import chalk from "chalk";

type Options = Partial<{
	url: string;
}>;

const isProduction = config.env("production") || config.env("staging");

export default class DatabaseControl extends ServiceControl<Options> {
	private static DEV_URI_FALLBACK = "mongodb://localhost/community";

	#mongoose: Mongoose | null = null;

	get running(): boolean {
		return !!this.#mongoose;
	}

	constructor() {
		super();

		mongoose.connection.on("connected", function (this: Connection) {
			const { host, port, name: db } = this;
			const connectionUri = chalk.blue(`${host}:${port}/${db}`);
			console.info(`\nDatabase connected at ${connectionUri}\n`);
		});

		mongoose.connection.on("disconnected", () => {
			console.error(`🆘 Database lost connection`);
		});
	}

	async start({ url }: Options = {}): Promise<this> {
		url ??= config.databaseUrl;

		if (!(url || isProduction)) url = DatabaseControl.DEV_URI_FALLBACK;

		if (!url) {
			throw "Database not set. Please, set environment variable DATABASE_URL";
		}

		this.#mongoose = await mongoose.connect(url, {
			appName: "Community",
			wtimeoutMS: isProduction ? 25_000 : 0,
			socketTimeoutMS: 30_000 * 3,
			maxPoolSize: 200,
			keepAlive: true,
			keepAliveInitialDelay: 300_000,
			serverSelectionTimeoutMS: isProduction ? 45_000 : 7_000,
		});

		return this;
	}

	async stop(): Promise<this> {
		await this.#mongoose?.disconnect();
		this.#mongoose = null;

		return this;
	}
}
