import React, { useState } from 'react';
import DpSearchGroup from './index';
import DpSelect from '@/ToolkitComponent/DpSelect';

const demo = () => {
  const [selectValue, setSelectValue] = useState(['all']);

  console.log('selectValue', selectValue);

  // 搜索栏数据
  const fields = [
    { label: '编码', name: 'code' },
    { label: '名称', name: 'name' },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      options: [
        { label: '禁用', value: '0' },
        { label: '启用', value: '1' },
      ],
    },
    {
      label: '自定义组件',
      name: 'timeRanges',
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
