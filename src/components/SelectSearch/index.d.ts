/*
 * @Description:
 * @Author: zhanghj
 * @Date: 2021-03-09 16:23:09
 * @LastEditors: zhanghj
 * @LastEditTime: 2021-03-12 16:09:21
 */

import { SelectProps } from 'antd/es/select';

export interface ISelectSearchProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  action: string; // 必填，请求地址
  headers: {}; // 请求头
  fetchData: {}; // 额外请求参数
  pageSize: number; // 分页数量，默认10
  debounceTimeout: number; // 延迟请求时间（单位毫秒），默认800
  labelAndValue: string[]; // 指定label和value的参数名称，默认['name', 'id']
}
