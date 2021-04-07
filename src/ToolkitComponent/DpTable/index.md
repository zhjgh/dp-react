---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpTable 表格
order: 11
---

# DpTable 表格

## 示例

<code src="./demo.tsx"></code>

## API 文档

| 属性         | 说明                                 | 类型                            | 默认值           | 是否必传 |
| ------------ | ------------------------------------ | ------------------------------- | ---------------- | -------- |
| ownColumns   | 表格列数据配置 updateMethod 刷新方法 | (updatefunc:Function)： columns | -                | 是       |
| fetchAction  | 异步请求，获取表格数据               | (payload)：Promise              | -                | 是       |
| fetchParams  | 请求附加参数                         | {}                              | -                |          |
| searchParams | 搜索项请求参数                       | {}                              | -                |          |
| baseProps    | Table 基础配置                       | {}                              | rowKey 默认是 id |          |
