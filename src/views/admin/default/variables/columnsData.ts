import { Column } from "react-table";

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];
export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export type ColumnData = Column[];

export type TableData = Column<{
  name: (string | boolean)[];
  date: string;
  progress: number;
  quantity?: number;
  status?: string;
  artworks?: string;
  rating?: number;
}>;

export type ReactTableProps = {
  columnsData: ColumnData;
  tableData: TableData[];
  isLoading?: boolean;
  manualPagination?: boolean;
  emptyDataMessage?: string;
};

export type PaginationProps = {
  currentPage: number;
  pageChangeHandler: Function;
  totalRows: number;
  rowsPerPage: number;
  isLoading?: boolean;
};

export interface TableProps extends ReactTableProps, PaginationProps {}
