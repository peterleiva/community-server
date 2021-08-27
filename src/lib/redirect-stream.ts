import { Writable } from "stream";

export default function redirectStream(...writables: Writable[]): Writable {
	return new Writable({
		write(chunk, _, next) {
			writables.forEach(w => w.write(chunk));
			next();
		},
	});
}
