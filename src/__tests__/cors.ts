import request from "supertest";
import type { Server } from "http";
import { createServer } from "test/factory/server";
import { ServerControl } from "services";

let server: Server;
let control: ServerControl;

beforeAll(async () => {
	control = await createServer();
	server = control.server;
});

afterAll(async () => {
	await control.stop();
});

describe("Cors", () => {
	const origins = {
		valid: [
			"http://localhost:3000",
			"http://localhost:4000",
			"https://studio.apollographql.com",
		],

		invalid: [
			"http://localhost",
			"http://subdomain.localhost:3000",
			"http://somedomain.com",
		],
	};

	describe.each(origins.valid)("valid with %s", origin => {
		test("correctly sent cors headers", async () => {
			const res = await request(server).options("/").set("Origin", origin);

			expect(res.statusCode).toBe(204);
			expect(res.get("Access-Control-Allow-Origin")).toBe(origin);
			expect(res.get("Access-Control-Allow-Methods")).toBe("GET,POST");
			expect(res.get("Access-Control-Max-Age")).toBe("600");
		});
	});

	describe.each(origins.invalid)("invalid with %s", origin => {
		test("doens't allow origin", async () => {
			const res = await request(server).options("/").set("Origin", origin);

			expect(res.statusCode).toBe(204);
			expect(res.get("Access-Control-Allow-Origin")).toBeUndefined();
		});
	});
});
