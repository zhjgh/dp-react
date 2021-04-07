---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpUploadImage 上传图片
order: 15
---

# DpUploadImage 上传图片

## 示例

<code src="./demo.tsx"></code>

## API 文档

| **属性**      | **说明**                 | **类型**               | **默认值**  | **是否必传** |
| ------------- | ------------------------ | ---------------------- | ----------- | ------------ |
| reqUrl        | 请求地址                 | string                 | \-          | 是           |
| headers       | 请求头参数               | object                 | \-          |
| reqParams     | 请求参数                 | object                 | \-          |
| direction     | 上传图片方向限制         | horizontal \| vertical | horizontal  |
| initialValues | 初始化数据               | array                  | \-          |
| isCanPreview  | 是否可以预览             | boolean                | true        |
| isCanRemove   | 是否可以删除             | boolean                | true        |
| multiple      | 是否可以同时上传多个图片 | boolean                | true        |
| isDragSort    | 是否开启拖拽排序         | boolean                | true        |
| maxCount      | 限制图片张数             | number                 | 1           |
| maxSize       | 文件大小限制             | number                 | 2（单位 M） |
| minSizeWidth  | 图片最小宽度             | number                 | \-          |
| maxSizeWidth  | 图片最大宽度             | number                 | \-          |
| minSizeHeight | 图片最小高度             | number                 | \-          |
| maxSizeHeight | 图片最大高度             | number                 | \-          |

## 接口返回数据格式

```
{
  state: 1, // 请求成功
  result: ["https://img.dragonpass.com.cn/uploadFile/lounge/20210302/45cb8d2c-591f-4439-aa24-e06da3ccf929.png"]
}
```
