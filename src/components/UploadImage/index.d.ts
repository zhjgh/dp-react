/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-03-01 18:22:45
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-03-12 16:08:29
 */

interface IImageList {
  uid: number;
  url: string;
  status: string;
  description?: string;
  orderNumber?: number;
}

type Direction = 'horizontal' | 'vertical';

export interface IUploadImageProps {
  action: string; // 必填，上传图片请求地址
  headers: {}; // 请求头参数
  fetchData: {}; // 请求参数
  maxSize: number; // 图片大小最大限制，默认15M
  isShowImg: boolean; // 是否支持图片预览，默认false
  initialValues: Array<IImageList>; // 初始化数据
  isCanRemove: boolean; // 是否可以删除，默认true
  multiple: boolean; // 是否可以同时上传多个图片，默认false
  isDragSort: boolean; // 是否开启拖拽排序，默认false
  maxCount: number; // 限制图片张数，默认1
  direction: Direction; // 图片展示方向，默认horizontal
  lineSize?: number; // 一行显示最大个数
  minSizeWidth?: number; // 图片最小宽度
  maxSizeWidth?: number; // 图片最大宽度
  minSizeHeight?: number; // 图片最小高度
  maxSizeHeight?: number; // 图片最大高度
  disabled?: boolean;
  explain?: string;
  showDescription?: boolean;
  placeholder?: string;
  onChange(fileLists, operateType?, operateIndex?): {};
}
