export type FieldsType = 'input' | 'select' | 'datePicker' | 'rangePicker';

export type FieldType = {
  type: FieldsType; // 表单类型
  componentProps?: any;
  [key: string]: any;
};

export type OptionsType = {
  label: string; // 参数
  value: string | number; // 值
};
