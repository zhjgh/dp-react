---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpSearchSelect 下拉搜索分页
order: 19
---

# DpSearchSelect 下拉搜索分页

## 单选

<code src="./sing-demo.tsx"></code>

## 多选

<code src="./mult-demo.tsx"></code>

## API 文档

| **属性**        | **说明**                                                                                                                     | **类型**                        | **默认值**       | **是否必传** |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------- | ------------ |
| reqUrl          | 请求地址                                                                                                                     | string                          | \-               | 是           |
| headers         | 请求头参数                                                                                                                   | object                          | \-               |
| reqParams       | 请求参数                                                                                                                     | object                          | \-               |
| pageSize        | 分页加载数量                                                                                                                 | number                          | 20               |
| debounceTimeout | 延迟请求时间（单位毫秒）                                                                                                     | number                          | 500              |
| labelAndValue   | 指定 label 和 value 的参数名称                                                                                               | array                           | \['name', 'id'\] |
| labelInValue    | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 \{ value: string, label: ReactNode \} 的格式 | boolean（单选 false 多选 true） | false            |
| initialValues   | initialValues                                                                                                                | string \| array                 | string           | \-           |
