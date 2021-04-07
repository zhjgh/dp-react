import React, { useState } from 'react';
import DpSearchGroup from './index';
import DpSelect from '@/ToolkitComponent/DpSelect';

const demo = () => {
  const [selectValue, setSelectValue] = useState(['all']);

  console.log('selectValue', selectValue);

  // 搜索栏数据
  const fields = [
    { name: '编码', label: 'code' },
    { name: '名称', label: 'name' },
    {
      name: '状态',
      label: 'status',
      type: 'select',
      options: [
        { label: '禁用', value: '0' },
        { label: '启用', value: '1' },
      ],
    },
    {
      name: '自定义组件',
      label: 'timeRanges',
      type: 'self',
      component: (
        <DpSelect
          options={[
            ['全部', 'all'],
            ['境内', 'abroad'],
            ['境外', 'domestic'],
          ]}
        />
      ),
      initialValue: selectValue,
    },
  ];

  // 查询
  const onSearch = (values: any) => {
    console.log(values);
  };

  return <DpSearchGroup fields={fields} onSearch={onSearch} />;
};

export default demo;
