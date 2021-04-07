import React, { memo, useState, forwardRef, ForwardedRef } from 'react';
import DpModal from '@/UIComponent/DpModal';
import { Form, Input, Row, Col, message, TimePicker } from 'antd';
import { getLayout } from '@/utils';
import moment from 'moment';
import lang from '@/locales';

const FormItem = Form.Item;
const format = 'HH:mm';

export interface IDpTimeSelectProps {
  value?: any;
  onChange?: (v: any) => {};
  modalName?: string;
}

const DpTimeSelect = forwardRef(
  (props: IDpTimeSelectProps, ref: ForwardedRef<any>) => {
    const { value, onChange, modalName, ...restProps } = props;
    const [visible, setVisible] = useState(false);
    const [modalForm, setModalForm] = useState({});
    const [form] = Form.useForm();

    console.log(value);

    const modalProps = {
      title: modalName,
      visible,
      onCancel() {
        setVisible(false);
      },
      onOk() {
        form.validateFields().then(values => {
          if (values.startTime && values.endTime) {
            onOKSave(
              `${moment(values.startTime).format('HH:mm')}-${moment(
                values.endTime,
              ).format('HH:mm')}`,
            );
          } else if (values.setTime) {
            onOKSave(`${values.setTime}`);
          } else if (
            (values.startTime && !values.endTime) ||
            (!values.startTime && values.endTime)
          ) {
            message.warning(`${lang.pleaseComplete}!`);
          }
        });
      },
    };

    const onOKSave = (e: any) => {
      setModalForm({});
      setVisible(false);
      onChange && onChange(e);
    };

    return (
      <div ref={ref}>
        <Input
          value={value}
          placeholder={lang.pleaseSelect}
          onFocus={e => {
            setVisible(true);
            const obj: any = {};
            if (value && value.indexOf('-') > -1) {
              obj.startTime = moment(value.split('-')[0], 'HH:mm');
              obj.endTime = moment(value.split('-')[1], 'HH:mm');
            }
            setModalForm(obj);
          }}
        />
        {visible && (
          <DpModal {...modalProps}>
            <Form className={'dp-form'} form={form} initialValues={modalForm}>
              <Row gutter={20}>
                <Col span={24}>
                  <FormItem
                    name="startTime"
                    label={lang.startTime}
                    {...getLayout()}
                  >
                    <TimePicker format={format} {...restProps} />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    name="endTime"
                    label={lang.endTime}
                    {...getLayout()}
                  >
                    <TimePicker format={format} />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </DpModal>
        )}
      </div>
    );
  },
);

DpTimeSelect.defaultProps = {
  modalName: lang.timeRanges,
};

export default memo(DpTimeSelect);
