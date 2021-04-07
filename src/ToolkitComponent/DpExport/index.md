---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpExport 导出
order: 19
---

# DpExport 导出

## 示例

<code src="./demo.tsx"></code>

## API 文档

| **属性**  | **说明**     | **类型**                                              | **默认值**                           |
| --------- | ------------ | ----------------------------------------------------- | ------------------------------------ |
| method    | 请求方式     | string                                                | post                                 |
| reqUrl    | 请求地址     | string                                                | \-                                   |
| headers   | 请求头       | object                                                | \-                                   |
| reqParams | 请求参数     | object                                                | \-                                   |
| type      | 按钮类型     | primary \| link \| text \| ghost \| default \| dashed | primary                              |
| name      | 按钮名称     | string                                                | 导出                                 |
| encType   | 编码方式     | string                                                | application/x\-www\-form\-urlencoded |
| disabled  | 是否禁止点击 | boolean                                               | false                                |
