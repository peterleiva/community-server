import mongoose, { Connection, Mongoose } from "mongoose";
import config from "config";
import chalk from "chalk";
import ServiceControl from "./service-control";
import { log } from "lib";

export type DatabaseOptions = Partial<{
	url: string;
}>;

const isProd = config.env("production", "staging");

export default class DatabaseControl extends ServiceControl {
	private static DEV_URI_FALLBACK = "mongodb://localhost/community";

	#mongoose: Mongoose | null = null;
	#url: string;

	constructor({ url }: DatabaseOptions = {}) {
		super();

		url ??= config.databaseUrl;

		if (!(url || isProd)) url = DatabaseControl.DEV_URI_FALLBACK;

		if (!url) {
			throw "Database not set. Please, set environment variable DATABASE_URL";
		}

		this.#url = url;

		mongoose.connection.on("connected", function (this: Connection) {
			const { host, port, name: db } = this;
			const connectionUri = chalk.blue(`${host}:${port}/${db}`);
			log.info(`Database connected at ${connectionUri}`);
		});

		mongoose.connection.on("disconnected", () => {
			log.info(`🆘 Database lost connection`);
		});
	}

	get running(): boolean {
		return !!this.#mongoose;
	}

	get connection(): Connection | undefined {
		return this.#mongoose?.connection;
	}

	async start(): Promise<this> {
		this.#mongoose = await mongoose.connect(this.#url, {
			appName: "Community",
			wtimeoutMS: isProd ? 25_000 : 0,
			socketTimeoutMS: 30_000 * 3,
			maxPoolSize: 200,
			keepAlive: true,
			keepAliveInitialDelay: 300_000,
			serverSelectionTimeoutMS: isProd ? 45_000 : 7_000,
		});

		return this;
	}

	async stop(): Promise<this> {
		await this.#mongoose?.disconnect();
		this.#mongoose = null;

		return this;
	}

	/**
	 * Remove all collections from database
	 */
	async cleanup(): Promise<this> {
		try {
			await this.#mongoose?.connection.dropDatabase();
		} catch (err) {
			log.error("Cannot clean the database");
			log.error("%o", err);
		}

		return this;
	}
}
