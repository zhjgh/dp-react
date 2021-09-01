import React from 'react';
import { FieldsType, OptionsType } from './DpField/index.d';

export interface BaseField<T extends FieldsType> {
  name?: string | JSX.Element; // 表单名
  type?: T; // 表单类型
  componentProps?: any; // 传给表单的参数
  initialValue?: any;
}

export interface InputField<T extends FieldsType = 'input'>
  extends BaseField<T> {
  label: string;
  type?: T;
  placeholder?: string;
}

export interface SelectField extends InputField<'select'> {
  options: OptionsType[];
}

export interface DatePickerField extends InputField<'datePicker'> {}

export interface rangePickerField extends BaseField<'rangePicker'> {
  label: string[];
  placeholder?: string[];
}

export type LabelType = string | string[];

export type Field =
  | InputField
  | SelectField
  | DatePickerField
  | rangePickerField;

export interface IDpSearchGroupProps {
  fields: any[]; // 必填，表单项配置
  isClean?: boolean; // 是否清空，关闭弹框的时候设置为true执行form.resetFields()和handleSearch方法
  onSearch(values: any, isSearch: boolean): void; // 必填，查询方法
  maxNum?: number; // 表单项显示最大数量，超过隐藏，默认8
  colSpan?: number; // 表单项宽度，默认6，每行4个。计算24/6=4
}
