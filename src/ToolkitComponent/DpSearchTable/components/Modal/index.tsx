// @ts-nocheck
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Input, Select, DatePicker } from 'antd';
import { getRules, getLayout, createDicNodes } from '@/utils';
import * as api from '@/services/api';

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
    title: currentRecord.id ? '修改人员' : '新增人员',
    async onOk() {
      /* form
        .validateFields()
        .then(async values => {
          setconfirmLoading(true);
          if (currentRecord.id) {
            // 编辑
            const params = {
              id: currentRecord.id,
              ...values,
            };
            const res: any = await api.updateItem(params);
            if (res.state === '1') {
              onConfirm();
            }
            setconfirmLoading(false);
          } else {
            // 新增
            const res: any = await api.addItem(values);
            if (res.state === '1') {
              onConfirm();
            }
            setconfirmLoading(false);
          }
        })
        .catch((error) => {
          console.log(error)
          setconfirmLoading(false);
        }); */
      let values = form.getFieldsValue();
      console.log('values', values);
      setconfirmLoading(true);
      if (currentRecord.id) {
        // 编辑
        const params = {
          id: currentRecord.id,
          ...values,
        };
        const res: any = await api.updateItem(params);
        if (res.state === '1') {
          onConfirm();
        }
        setconfirmLoading(false);
      } else {
        // 新增
        const res: any = await api.addItem(values);
        if (res.state === '1') {
          onConfirm();
        }
        setconfirmLoading(false);
      }
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

  const hanleDatePicker = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Modal {...modalProps}>
      <Form form={form}>
        <Row>
          <Col span={24}>
            <FormItem name="id" {...getRules('ID', true, true)} {...layout}>
              <Input disabled={currentRecord.id ? true : false} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name="name" {...getRules('姓名', true, true)} {...layout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name="age" {...getRules('年龄', true, true)} {...layout}>
              <Input />
            </FormItem>
          </Col>
          {/* <Col span={24}>
            <FormItem
              name="birthDate"
              {...getRules('出生日期', true, true, [{ max: 30 }])}
              {...layout}
            >
              <DatePicker onChange={hanleDatePicker} />
            </FormItem>
          </Col> */}
          <Col span={24}>
            <FormItem name="sex" {...getRules('性别')} {...layout}>
              <Select placeholder="请选择">
                {createSelectOption({
                  list:
                    [
                      ['男', 0],
                      ['女', 1],
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
