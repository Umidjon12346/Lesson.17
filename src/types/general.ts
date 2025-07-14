import type { TablePaginationConfig } from "antd/es/table";


export interface ParamType{
    page:number,
    limit:number
}

export interface Paginationconfig {
  pagination: TablePaginationConfig;
  setParams: (pagination: ParamType) => void;
}