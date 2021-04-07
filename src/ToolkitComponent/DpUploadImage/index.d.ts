/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-03-01 18:22:45
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-04-06 10:09:40
 */
import { IRequestProps } from '@/global';

interface IFile {
  uid?: number | string;
  name?: string;
  url?: string;
  status?: string;
  description?: string;
  orderNumber?: number;
  type?: string;
  percent?: number;
}

type Direction = 'horizontal' | 'vertical';

type UploadType = 'text' | 'picture' | 'picture-card';

export interface IDpUploadImageProps extends IRequestProps {
  initialValues?: Array<IFile>; // 初始化数据
  direction?: Direction; // 图片展示方向，默认horizontal
  listType?: UploadType; // 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card

  isDragSort?: boolean; // 是否开启拖拽排序，默认true

  maxSize?: number; // 图片大小最大限制，默认2M
  maxCount?: number; // 限制图片张数，默认1张

  minSizeWidth?: number; // 图片最小宽度
  maxSizeWidth?: number; // 图片最大宽度
  minSizeHeight?: number; // 图片最小高度
  maxSizeHeight?: number; // 图片最大高度

  explain?: string;
  showDescription?: boolean;
  placeholder?: string;
}
