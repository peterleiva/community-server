/* eslint-disable no-var */
import "jest-extended";
import type { Logger } from "pino";

declare global {
	var __MONGO_URI__: string;
	var log: Logger;
}
