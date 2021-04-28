---
group:
  title: 业务组件
  path: '/ToolkitComponent'
title: DpSearchGroup 查询
order: 10
---

# DpSearchGroup 查询

## 示例

<code src="./demo.tsx"></code>

## API 文档

| \***\*属性\*\*** | \***\*说明\*\***                                                                   | \***\*类型\*\***      | \***\*默认值\*\*** | \***\*是否必传\*\*** |
| ---------------- | ---------------------------------------------------------------------------------- | --------------------- | ------------------ | -------------------- |
| fields           | 表单项配置                                                                         | array                 | \\\-               | 是                   |
| onSearch         | 查询方法                                                                           | \\\(value\\\) => void | \\\-               | 是                   |
| isClean          | 是否清空，关闭弹框的时候设置为 true 执行 form\.resetFields\(\)和 handleSearch 方法 | boolean               | false              |
| maxNum           | 表单项显示最大数量，超过隐藏，显示更多按钮                                         | number                | 8                  |
| colSpan          | 表单项宽度，默认 6，每行 4 个。计算 24/6=4                                         | number                | 6                  |

## fields 搜索项配置

| **属性**     | **说明**               | **类型**                                             | **默认值** | **是否必传** |
| ------------ | ---------------------- | ---------------------------------------------------- | ---------- | ------------ |
| label        | 显示名称               | string                                               | \-         | 是           |
| name         | 传值参数               | string \| string\[\]                                 | \-         | 是           |
| type         | 表单项类型             | input \| select \| datePicker \| rangePicker \| self | input      |              |
| options      | 类型是 select 才需要传 | \[\{ label: string, value: string \| number \}\]     | \-         |              |
| initialValue | 初始值                 | string \| string\[\]                                 | \-         |              |
| component    | 自定义组件             |                                                      |            |              |
