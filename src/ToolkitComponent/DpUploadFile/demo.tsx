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

  const handleChange = (v: any) => {
    console.log(v);
  };

  return (
    <>
      <DpUploadFile
        reqUrl="http://platform-gateway.platform.svc.dragon/boss/file/uploadFile"
        onChange={handleChange}
      />
      <Form form={form}>
        <FormItem name="file">
          <DpUploadFile
            reqUrl="http://platform-gateway.platform.svc.dragon/boss/file/uploadFile"
            headers={{
              Token: localStorage.getItem('token'),
            }}
            reqParams={{
              productType: 'LS',
              channel: 'platform',
              moduleId: 'equity',
            }}
            onChange={handleChange}
          />
        </FormItem>
        <Button type="primary" onClick={submit}>
          获取数据
        </Button>
      </Form>
    </>
  );
};

export default Demo;
