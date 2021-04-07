const lang: any = ((window as any).lang = new Proxy(
  {},
  {
    get(target: any, name) {
      return target[name] || name;
    },
  },
));

export default {
  searchGroup: {
    search: (lang && lang['查询']) || '查询',
    moreSearch: (lang && lang['更多查询']) || '更多查询',
    hideSearch: (lang && lang['收起查询']) || '收起查询',
    clean: (lang && lang['清空']) || '清空',
    pleaseInput: (lang && lang['请输入']) || '请输入',
    pleaseSelect: (lang && lang['全部']) || '全部',
    startTime: (lang && lang['开始时间']) || '开始时间',
    endTime: (lang && lang['结束时间']) || '结束时间',
  },
  uploadFile: {
    pleaseUpload: (lang && lang['请上传']) || '请上传',
    fileType: (lang && lang['类型的文件']) || '类型的文件',
    fileTypeError: (lang && lang['文件类型不符合']) || '文件类型不符合',
    fileSizeLimit: (lang && lang['文件限制大小']) || '文件限制大小',
    fileReachLimit: (lang && lang['文件已达上限']) || '文件已达上限',
    addFile: (lang && lang['添加文件']) || '添加文件',
    singleFileNoMoreThan: (lang && lang['单个文件不超过']) || '单个文件不超过',
    uploadAgainError: (lang && lang['再次上传失败']) || '再次上传失败',
    uploadAgain: (lang && lang['重新上传']) || '重新上传',
    delete: (lang && lang['删除']) || '删除',
    uploadSuccess: (lang && lang['上传成功']) || '上传成功',
    uploadFail: (lang && lang['上传失败']) || '上传失败',
  },
  uploadImage: {
    uploadFail: (lang && lang['上传失败']) || '上传失败',
    uploadAgain: (lang && lang['重新上传']) || '重新上传',
    noData: (lang && lang['暂无数据']) || '暂无数据',
    canDragDrop: (lang && lang['可拖拽']) || '可拖拽',
    correctImage: (lang && lang['请上传正常图片格式']) || '请上传正常图片格式',
    maxLengthLimit:
      (lang && lang['选择的图片不可超过']) || '选择的图片不可超过',
    zhang: (lang && lang['张']) || '张',
    maxSizeLimit: (lang && lang['图片限制大小']) || '图片限制大小',
    widthNoLessThan: (lang && lang['图片宽度不能小于']) || '图片宽度不能小于',
    widthNoMoreThan: (lang && lang['图片宽度不能大于']) || '图片宽度不能大于',
    heightNoLessThan: (lang && lang['图片高度不能小于']) || '图片高度不能小于',
    heightNoMoreThan: (lang && lang['图片高度不能大于']) || '图片高度不能大于',
    pixel: (lang && lang['像素']) || '像素',
    horizontal: (lang && lang['请上传横图']) || '请上传横图',
    vertical: (lang && lang['请上传竖图']) || '请上传竖图',
  },
  selectSearch: {
    pleaseSelect: '请选择',
    multiple: '可多选',
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
};
