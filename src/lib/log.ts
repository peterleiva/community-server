import { createWriteStream, mkdirSync, existsSync } from "fs";
import pino from "pino";
import { multistream } from "pino-multi-stream";
import config from "config";
import redirect from "./redirect-stream";

const basepath = `${process.cwd()}/tmp/log`;
const logFile = `${basepath}/${config.env()}.log`;

if (!existsSync(basepath)) {
	mkdirSync(basepath, {
		recursive: true,
		mode: 0o750,
	});
}

const file = createWriteStream(logFile, { flags: "a", mode: 0o640 });

const streams = [
	{ stream: redirect(file, process.stdout) },
	{ level: "error", stream: redirect(file, process.stderr) },
];

const redact = config.env("production", "staging")
	? ["*.remoteAddress", "*.remotePort"]
	: [];

const log = pino(
	{
		name: "Community",
		enabled: !config.noLog,
		prettyPrint: config.env("dev") && {
			translateTime: true,
		},
		redact,
		level: config.logLevel,
	},
	multistream(streams, { dedupe: true })
);

export default log;
