import type SortArg from './sort/sort-arg';
import type { ConnectionInput } from './connection/connection-input.interface';

export default interface PaginationArgs<TSortable> {
  pagination: ConnectionInput;
  sortBy?: SortArg<TSortable>;
}
