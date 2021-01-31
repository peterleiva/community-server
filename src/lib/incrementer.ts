export default function* incrementer(initial = 1): Generator<number> {
  for (let i = initial; ; i++) yield i;
}
