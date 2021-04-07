import React from 'react';
import { Form, Button } from 'antd';
import DpSelect from './index';

const FormItem = Form.Item;

const Demo = () => {
  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then(values => {
      console.log(values);
    });
  };

  const data = [
    ['全部', 'all'],
    ['境内', 'abroad'],
    ['境外', 'domestic'],
  ];

  return (
    <Form form={form}>
      <FormItem name="select" initialValue={['all']}>
        <DpSelect options={data} />
      </FormItem>
      <Button type="primary" onClick={submit}>
        获取数据
      </Button>
    </Form>
  );
};

export default Demo;
