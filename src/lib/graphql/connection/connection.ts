import Edge from './edge';
import PageInfo from './page-info';

export default class Connection<TNode> {
  constructor(
    private _edges: [Edge<TNode>],
    private _pageInfo: NonNullable<PageInfo>,
    private _pageSize: number,
    private _totalCount: number
  ) {}

  addEdge(edge: Edge<TNode>): this {
    this._edges.push(edge);

    return this;
  }

  get edge(): [Edge<TNode>] {
    return this._edges;
  }

  get pageInfo(): PageInfo {
    return this._pageInfo;
  }

  set pageInfo(pageInfo: PageInfo) {
    this._pageInfo = pageInfo;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get totalCount(): number {
    return this._totalCount;
  }
}
