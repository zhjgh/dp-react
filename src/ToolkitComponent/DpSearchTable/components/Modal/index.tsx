// @ts-nocheck
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Input, Select } from 'antd';
import { getRules, getLayout, createDicNodes } from '@/utils';
import api from '@/services/api';

const { createSelectOption } = createDicNodes;
const FormItem = Form.Item;
const layout = getLayout(4, 24);

const Index = (props: any) => {
  const { visible, currentRecord, onClose, onConfirm } = props;
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const modalProps = {
    visible,
    confirmLoading,
    title: currentRecord.id ? '修改语言' : '新增语言',
    onOk() {
      form
        .validateFields()
        .then(async values => {
          setconfirmLoading(true);
          if (currentRecord.id) {
            // 编辑
            const params = {
              id: currentRecord.id,
              ...values,
            };
            const res: any = await api.updateLanguage(params);
            if (res.state === '1') {
              onConfirm();
            }
            setconfirmLoading(false);
          } else {
            // 新增
            const res: any = await api.addLanguage(values);
            if (res.state === '1') {
              onConfirm();
            }
            setconfirmLoading(false);
          }
        })
        .catch(() => {
          setconfirmLoading(false);
        });
    },
    onCancel: () => onClose(),
  };

  useEffect(() => {
    if (visible && Object.keys(currentRecord).length > 0) {
      form.setFieldsValue(currentRecord);
    }
    return () => {
      form.resetFields();
    };
  }, [visible]);

  return (
    <Modal {...modalProps}>
      <Form form={form}>
        <Row>
          <Col span={24}>
            <FormItem
              name="code"
              {...getRules('编号', true, true, [
                { max: 10 },
                { pattern: /[^\u4e00-\u9fa5]/, message: '不能输入中文字符' },
              ])}
              {...layout}
            >
              <Input disabled={currentRecord.id ? true : false} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              name="name"
              {...getRules('名称', true, true, [{ max: 30 }])}
              {...layout}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              name="name2"
              {...getRules('繁体名称', true, true, [{ max: 30 }])}
              {...layout}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              name="ename"
              {...getRules('英文名称', true, true, [{ max: 30 }])}
              {...layout}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              name="status"
              {...getRules('状态', true, false)}
              {...layout}
            >
              <Select placeholder="请选择">
                {createSelectOption({
                  list:
                    [
                      ['禁用', 0],
                      ['启用', 1],
                    ] || [],
                })}
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Index;
