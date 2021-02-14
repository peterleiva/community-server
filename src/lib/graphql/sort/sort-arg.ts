import type Sort from './sort.enum';

type SortArg<TSortable> = {
  [P in keyof TSortable]: Sort;
};

export default SortArg;
