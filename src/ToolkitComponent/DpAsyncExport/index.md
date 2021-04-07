---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpAsyncExport 异步导出
order: 20
---

# DpAsyncExport 异步导出

## 示例

<code src="./demo.tsx"></code>

## API 文档

| **属性**     | **说明**     | **类型**                                                  | **默认值**                      |
| ------------ | ------------ | --------------------------------------------------------- | ------------------------------- |
| method       | 请求方式     | string                                                    | get                             |
| reqUrl       | 请求地址     | string                                                    | \-                              |
| headers      | 请求头       | object                                                    | \-                              |
| reqParams    | 请求参数     | object                                                    | \-                              |
| btnType      | 按钮类型     | primary \| link \| text \| ghost \| default \| dashed     | primary                         |
| btnName      | 按钮名称     | string                                                    | 导出                            |
| disabled     | 是否禁止点击 | boolean                                                   | false                           |
| encType      | 编码格式     | string                                                    | application/json;charset=UTF\-8 |
| fileName     | 文件命名     | string                                                    | 导出文件\.xlsx                  |
| responseType | 返回格式     | arraybuffer \| blob \| document \| json \| text \| stream | blob                            |
