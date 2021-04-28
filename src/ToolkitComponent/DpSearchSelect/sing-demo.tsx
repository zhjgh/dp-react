import React from 'react';
import { Form, Button } from 'antd';
import IDpSearchSelect from './index';

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
      <FormItem name="supplier">
        <IDpSearchSelect
          labelInValue={false}
          initialValues="2611"
          reqUrl="http://platform-gateway.platform.svc.dragon/boss/supplier/info/getPage"
          reqParams={{
            lg: 'zh-cn',
          }}
          headers={{
            Token: localStorage.getItem('token'),
          }}
        />
      </FormItem>
      <Button type="primary" onClick={submit}>
        获取数据
      </Button>
    </Form>
  );
};

export default Demo;
