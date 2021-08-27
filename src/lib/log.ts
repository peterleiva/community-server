import pino from "pino";
import config from "config";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import redirect from "./redirect-stream";

const base = `${process.cwd()}/tmp/log`;
const destFilename = `${base}/${config.env()}.log`;

if (!existsSync(base)) {
	mkdirSync(base, {
		recursive: true,
		mode: 0o750,
	});
}

const file = createWriteStream(destFilename, { flags: "a", mode: 0o640 });

const streams = [
	{ stream: redirect(file, process.stdout) },
	{ level: "error", stream: redirect(file, process.stderr) },
];

const log = pino(
	{
		prettyPrint: !!config.env("development"),
		level: config.logLevel,
	},
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	pino.multistream(streams, { dedupe: true })
);

export default log;
