import { createWriteStream, mkdirSync, existsSync } from "fs";
import pino from "pino";
import { multistream } from "pino-multi-stream";
import config from "config";
import redirect from "./redirect-stream";
import { type Writable } from "stream";

const basepath = `${process.cwd()}/tmp/log`;
const logFile = `${basepath}/${config.env()}.log`;

if (!existsSync(basepath)) {
	mkdirSync(basepath, {
		recursive: true,
		mode: 0o750,
	});
}

//  save log except in test environment
const redirectToFile = (...streams: Writable[]) =>
	config.env("test")
		? redirect(...streams)
		: redirect(
				createWriteStream(logFile, { flags: "a", mode: 0o640 }),
				...streams
		  );

const streams = [
	{ stream: redirectToFile(process.stdout) },
	{ level: "error", stream: redirectToFile(process.stderr) },
];

const redact: string[] = [];

if (config.env("prod")) redact.push(...["*.remoteAddress", "*.remotePort"]);

const log = pino(
	{
		enabled: !config.noLog,
		prettyPrint: config.env("dev") && {
			translateTime: "SYS:standard",
		},
		redact,
		level: config.env("test") ? "warn" : config.logLevel,
	},
	multistream(streams, { dedupe: true })
);

export default log;
