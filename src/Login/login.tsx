import React from 'react';
import { Form, Input, Button } from 'antd';
import { useRequest } from '@umijs/hooks';
import api from '@/services/api';

const FormItem = Form.Item;

const Login = () => {
  const [form] = Form.useForm();
  const { run, loading } = useRequest(api.login, { manual: true });

  const onFinish = (values: { userName: string; passWord: string }) => {
    run(values).then(res => {
      console.log('登录', res);
      if (res.state === '1') {
        localStorage.setItem('token', res.result.userInfo.sessionid);
        window.location.reload();
      }
    });
  };

  return (
    <Form form={form} style={{ margin: '20px 0' }} onFinish={onFinish}>
      <FormItem name="userName">
        <Input placeholder="请输入登录账号" />
      </FormItem>
      <FormItem name="passWord">
        <Input type="password" placeholder="请输入登录密码" />
      </FormItem>
      <Button type="primary" htmlType="submit" loading={loading}>
        登录获取token
      </Button>
    </Form>
  );
};

export default Login;
