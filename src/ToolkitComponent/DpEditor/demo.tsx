import React from 'react';
import { Form, Button } from 'antd';
import BraftEditor from 'braft-editor';
import DpEditor from './index';

const FormItem = Form.Item;

const Demo = () => {
  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then(values => {
      const editor = values.editor;
      const editorState = BraftEditor.createEditorState;
      // 将editorState数据转换成RAW字符串
      const rawString = editorState(editor).toRAW();
      console.log('rawString', rawString);
      // 将editorState数据转换成html字符串
      const htmlString = editorState(editor).toHTML();
      console.log('htmlString', htmlString);
    });
  };

  return (
    <Form form={form}>
      <FormItem name="editor">
        <DpEditor
          uploadUrl="http://platform-gateway.platform.svc.dragon/boss/file/uploadImgs"
          headers={['Token', localStorage.getItem('token')]}
          channel="test"
        />
      </FormItem>
      <Button type="primary" onClick={submit}>
        获取数据
      </Button>
    </Form>
  );
};

export default Demo;
