import type { Cursor } from './connection-input.interface';

export default class PageInfo {
  constructor(
    private _startCursor: Cursor,
    private _endCursor: Cursor,
    private _hasNextPage: boolean,
    private _hasPreviousPage: boolean
  ) {}

  get startCursor(): Cursor {
    return this._startCursor;
  }

  set startCursor(cursor: Cursor) {
    this._startCursor = cursor;
  }

  get endCursor(): Cursor {
    return this._endCursor;
  }

  set endCursor(cursor: Cursor) {
    this._endCursor = cursor;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }

  set hasNextPage(value: boolean) {
    this._hasNextPage = value;
  }

  get hasPreviousPage(): boolean {
    return this._hasPreviousPage;
  }

  set hasPreviousPage(value: boolean) {
    this._hasPreviousPage = value;
  }
}
