import React from 'react';
import { Select, Radio, Checkbox } from 'antd';

const RadioButton = Radio.Button;
const SelectOption = Select.Option;

export const createRadio = ({ list = [], disabled = false }) => {
  return list.map(item => (
    <Radio disabled={disabled} value={item[1]} key={item[1]}>
      {item[0]}
    </Radio>
  ));
};

export const createRadioButton = ({ list = [], disabled = false }) => {
  return list.map(item => (
    <RadioButton disabled={disabled} value={item[1]} key={item[1]}>
      {item[0]}
    </RadioButton>
  ));
};

export const createSelectOption = ({ list = [], disabled = false }) => {
  return list.map(item => (
    <SelectOption disabled={disabled} value={item[1]} key={item[1]}>
      {item[0]}
    </SelectOption>
  ));
};

export const createCheckbox = ({ list = [], disabled = false, ...props }) => {
  return list.map(item => (
    <Checkbox {...props} disabled={disabled} value={item[1]} key={item[1]}>
      {item[0]}
    </Checkbox>
  ));
};

export const createSelect = ({ list = [], ...props }) => {
  return <Select {...props}>{createSelectOption({ list })}</Select>;
};

const createDicNodes = {
  createRadio,
  createRadioButton,
  createSelectOption,
  createCheckbox,
  createSelect,
};

export default createDicNodes;
