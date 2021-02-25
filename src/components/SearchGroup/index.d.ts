import React from 'react'
import { FieldsType, OptionsType } from '../Field/index.d'

export interface BaseField<T extends FieldsType> {
  name?: string | JSX.Element; // 表单名
  type?: T; // 表单类型
  componentProps?: any; // 传给表单的参数
  initialValue?: any;
}

export interface InputField<T extends FieldsType = 'input'>
  extends BaseField<T> {
  type?: T;
  label: string;
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

export type Field =
  | InputField
  | SelectField
  | DatePickerField
  | rangePickerField

export interface SearchGroupProps {
  fields: Field[];
  onSearch(values: object): void;
  colSpan: number;
  maxNum: number;
  extraParams?: { [key: string]: any };
}