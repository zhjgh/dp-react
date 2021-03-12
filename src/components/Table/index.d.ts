export interface ITableProps {
  ownColumns(updatefunc): {}; // 必填，表格列配置回调方法
  fetchAction(arg): {}; // 必填，异步请求方法
  fetchParams: {}; // 请求附加参数
  baseProps: any; // antd Table基础配置
}

