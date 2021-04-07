---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpUploadFile 上传文件
order: 14
---

# DpUploadFile 上传文件

## 示例

<code src="./demo.tsx"></code>

## API 文档

| **属性**      | **说明**               | **类型** | **默认值**   | **是否必传** |
| ------------- | ---------------------- | -------- | ------------ | ------------ |
| reqUrl        | 请求地址               | string   | \-           | 是           |
| headers       | 请求头参数             | object   | \-           |
| reqParams     | 请求参数               | object   | \-           |
| maxSize       | 文件大小限制           | number   | 15（单位 M） |
| maxCount      | 文件最大上传数量       | number   | 1            |
| isCanRemove   | 是否可以删除           | boolean  | true         |
| pageSize      | 分页大小               | number   | 5            |
| initialValues | 初始化数据             | \[\]     | \-           |
| accept        | 限制上传的文件类型     | string   | \-           |
| explain       | 自定义文件大小限制说明 | string   | \-           |

## 接口返回数据格式

```
{
  state: 1, // 请求成功
  result: ["https://img.dragonpass.com.cn/uploadFile/lounge/20210302/45cb8d2c-591f-4439-aa24-e06da3ccf929.png"]
}
```
