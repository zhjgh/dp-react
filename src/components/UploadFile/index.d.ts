/*
 * @Description: 
 * @Author: zhanghj
 * @Date: 2021-03-01 11:26:32
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-03-12 16:07:02
 */
export interface IUploadFileProps {
  action: string; // 必填，上传文件请求地址
  headers: {}, // 请求头参数
  fetchData: {}; // 额外请求参数
  accept: []; // 限制上传的文件类型
  maxSize: number; // 文件大小限制
  maxCount: number; // 文件最大上传数量
  pageSize: number; // 分页大小
  isCanRemove: boolean; // 是否可以删除
  initialValues: []; // 初始化数据
  explain: string; // 自定义文件大小限制说明
  onChange(value): {};
}