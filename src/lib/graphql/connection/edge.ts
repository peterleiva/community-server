import type { Cursor } from './connection-input.interface';

export default class Edge<TNode> {
  constructor(private _node: TNode, private _cursor: NonNullable<Cursor>) {}

  get cursor(): Cursor {
    return this._cursor;
  }

  get node(): TNode {
    return this._node;
  }
}
