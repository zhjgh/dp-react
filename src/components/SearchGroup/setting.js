const lang = (window.lang = new Proxy(
  {},
  {
    get(target, name) {
      return target[name] || name
    },
  }
))

export default {
  text: {
    search: (lang && lang['查询']) || '查询',
    moreSearch: (lang && lang['更多查询']) || '更多查询',
    hideSearch: (lang && lang['收起查询']) || '收起查询',
    clean: (lang && lang['清空']) || '清空',
    pleaseInput: (lang && lang['请输入']) || '请输入',
    pleaseSelect: (lang && lang['全部']) || '全部',
    startTime: (lang && lang['开始时间']) || '开始时间',
    endTime: (lang && lang['结束时间']) || '结束时间',
  },
  layout: {
    formItemLayout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    },
  },
}
