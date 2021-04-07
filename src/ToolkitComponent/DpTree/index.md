---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpTree 树
order: 26
---

# DpTree 树

## 示例

<code src="./demo.tsx"></code>

## API 文档

| **属性**   | **说明**     | **类型**                      | **默认值** |
| ---------- | ------------ | ----------------------------- | ---------- |
| value      | 选中的值     | string\[\]                    | \[\]       |
| onChange   | 选中回调函数 | \(value: string\[\]\) => void | \-         |
| treeSource | 树数据源     | array                         | \[\]       |
| type       | 类型         | page \| modal                 | page       |
| title      | 树名称       | string                        | \-         |
