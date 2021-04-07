import React from 'react';
import { Form, Button } from 'antd';
import DpTreeSelect from './index';

const FormItem = Form.Item;

const Demo = () => {
  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then(values => {
      console.log(values);
    });
  };

  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  return (
    <Form form={form}>
      <FormItem name="treeSelect">
        <DpTreeSelect multiple={true} treeData={treeData} />
      </FormItem>
      <Button type="primary" onClick={submit}>
        获取数据
      </Button>
    </Form>
  );
};

export default Demo;
