import React from 'react';
import { Form, Button } from 'antd';
import DpUploadFile from './index';

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
      <FormItem name="file">
        <DpUploadFile
          reqUrl="https://platform-gw-test.dragonpass.com.cn/boss/file/uploadFile"
          headers={{
            Token: localStorage.getItem('token'),
          }}
          reqParams={{
            productType: 'LS',
            channel: 'platform',
            moduleId: 'equity',
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
