import React from 'react';
import { Form, Button } from 'antd';
import DpTimeSelect from './index';

const FormItem = Form.Item;

const Demo = () => {
  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then(values => {
      console.log(values);
    });
  };

  return (
    <Form form={form}>
      <FormItem name="timeSelect" initialValue="12:00-14:00">
        <DpTimeSelect />
      </FormItem>
      <Button type="primary" onClick={submit}>
        获取数据
      </Button>
    </Form>
  );
};

export default Demo;
