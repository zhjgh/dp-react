import { useState, useEffect, forwardRef, memo, ForwardedRef } from 'react';
import { Select } from 'antd';
import React from 'react';
import lang from '@/locales';
import { SelectProps } from 'antd/lib/select';

const { Option } = Select;

export interface IDpSelectProps extends SelectProps<any> {
  options?: any[];
}

const DpSelect = forwardRef((props: IDpSelectProps, ref: ForwardedRef<any>) => {
  const {
    options = [],
    children,
    placeholder,
    value,
    onChange,
    onBlur,
    maxTagCount = 2,
    disabled,
    ...restProps
  } = props;
  const [current, setCurrent] = useState(value?.length || 0);
  const [initValue, setInitValue] = useState<any[] | undefined>(value);
  const [initChecked, setInitChecked] = useState(false);

  console.log(props);

  useEffect(() => {
    if (value !== initValue && Array.isArray(value)) {
      setInitValue([...value]);
      setCurrent(value?.length || 0);
    }
  }, [value]);

  const onHandleChange = (e: any) => {
    setInitChecked(false);
    if (e.includes('all')) {
      onChange && onChange(['all'], e);
      setInitValue(['all']);
      setInitChecked(true);
    } else {
      onChange && onChange(e, e);
      setInitValue(e);
    }
    setCurrent(e.length);
  };

  return (
    <Select
      ref={ref}
      mode="multiple"
      value={initValue}
      allowClear
      maxTagCount={disabled ? 10000 : maxTagCount}
      maxTagPlaceholder={
        current > maxTagCount ? `+${current - maxTagCount}` : ''
      }
      placeholder={placeholder}
      onChange={v => {
        return onHandleChange(v);
      }}
      onBlur={e => {
        return onBlur && onBlur(value);
      }}
      style={{ width: '100%' }}
      optionFilterProp="children"
      filterOption={(input: string, option: any) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      {...restProps}
    >
      {children ||
        options.map(_ => {
          return (
            <Option
              disabled={(initChecked && _[1] !== 'all') || _[2]}
              value={_[1]}
              key={_[1]}
            >
              {_[0]}
            </Option>
          );
        })}
    </Select>
  );
});

DpSelect.defaultProps = {
  placeholder: lang.pleaseSelect,
};

export default memo(DpSelect);
