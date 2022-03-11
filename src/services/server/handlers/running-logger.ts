import type { Config } from "config";
import type ServerControl from "../server-control";
import address from "address";
import chalk from "chalk";
import styleAddress from "./style-address";

/**
 * Inform to the user that the server is running. print the message to shell
 *
 * @param config
 * @returns
 */
export default function runningLogger(
	service: ServerControl,
	config: Config
): () => void {
	return () => {
		const port = service.port;

		if (!port) {
			log.error(`Server is not running`);
			return;
		}

		log.info(
			"%s %s on 📦 %s environment",
			"🚀",
			chalk.green("running"),
			chalk.magenta(config.env())
		);

		log.info(
			"%s Listening on %s",
			"🔈",
			styleAddress({ hostname: "localhost", port })
		);

		log.info(
			"%s On your Network %s",
			"🏠",
			styleAddress({ hostname: address.ip(), port })
		);
	};
}
