export interface ArgTableProps {
  owncolumns(): {};
  queryAction(arg): {
    catch(err: any): void
  };
  params: {};
  baseProps: any;
}

export interface paginationInitialType {
  current: number;
  pageSize: number;
  total: number;
}

export interface initialStateType {
  loading: boolean;
  pagination: paginationInitialType;
  dataSource: [];
}

export interface actionType {
  type: string;
  payload?: {
    pagination: paginationInitialType,
    dataSource: [];
  };
}
