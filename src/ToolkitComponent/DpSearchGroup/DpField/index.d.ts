export type FieldsType =
  | 'input'
  | 'select'
  | 'datePicker'
  | 'rangePicker'
  | 'self';

export type OptionsType = {
  label: string; // 参数
  value: string | number; // 值
};

export type FieldType = {
  type: FieldsType; // 表单类型
  component?: any;
  componentProps?: any; // 组件属性
};
