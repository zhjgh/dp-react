import React, { forwardRef } from 'react';
import { Input, Select, DatePicker } from 'antd';
import { FieldType, OptionsType } from './index.d';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DpField = forwardRef((props: FieldType, ref) => {
  const { type, componentProps = {}, ...otherProps } = props;

  switch (type) {
    case 'input':
      return <Input {...componentProps} {...otherProps} ref={ref} />;
    case 'select':
      return (
        <Select {...componentProps} {...otherProps} ref={ref}>
          {(componentProps.options as OptionsType[]).map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      );
    case 'datePicker':
      return (
        <DatePicker
          {...componentProps}
          {...otherProps}
          style={{ width: '100%' }}
          ref={ref}
        />
      );
    case 'rangePicker':
      return (
        <RangePicker
          {...componentProps}
          {...otherProps}
          style={{ width: '100%' }}
          ref={ref}
        />
      );
    default:
      return null;
  }
});

export default DpField;
