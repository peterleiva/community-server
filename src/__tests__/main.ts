import type { Connection } from "mongoose";
import { databaseSetup } from "utils";

const service = databaseSetup();

it("All setup", async () => {
	const db = (service.connection as Connection).db;

	const movie = {
		title: "True Romance",
		year: "1993",
	};

	await db.collection("movies").insertOne(movie);
	await expect(db.collection("movies").findOne()).resolves.toMatchObject(movie);
});

it("another", async () => {
	const db = service.connection as Connection;
	const movies = await db.collection("movies").find().toArray();

	expect(movies).toBeEmpty();
});
