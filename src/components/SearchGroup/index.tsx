// @ts-nocheck
import React, { useMemo, useReducer, useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'antd';
import { SearchGroupProps, LabelType, SelectField } from '.';
import Field from '../Field';
import { pick } from 'lodash';
import setting from '../../setting';

const SearchGroup: React.FC<SearchGroupProps> = props => {
  const colSpan = 6;
  const { maxNum, onSearch, fetchParams } = props;
  const [form] = Form.useForm();
  const [isCollapsed, toggleCollapse] = useReducer(state => !state, true);

  // 遍历数据
  const fields = useMemo(
    () =>
      props.fields.map(item => ({
        ...item,
        type: item.type || 'input',
        componentProps: {
          ...(item.componentProps || {}),
          placeholder:
            item.placeholder ||
            (item.type === 'rangePicker' && [
              setting.searchGroup.startTime,
              setting.searchGroup.endTime,
            ]) ||
            (item.type === 'select' && setting.searchGroup.pleaseSelect) ||
            `${setting.searchGroup.pleaseInput}${item.name}`,
          options:
            Object.prototype.toString.call((item as SelectField).options) ===
            '[object Array]'
              ? (item as SelectField).options
              : Object.prototype.toString.call(
                  (item as SelectField).options,
                ) === '[object Object]'
              ? Object.entries(
                  (item as SelectField).options,
                ).map(([name, value]) => ({ name, value }))
              : [],
        },
      })),
    [props.fields],
  );

  // 查询
  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        onSearch({
          ...(fetchParams || {}),
          ...fields
            .filter(v => v.type === 'rangePicker')
            .map(v => v.label)
            .reduce(
              (acc, [start, end]) => ({
                ...acc,
                [start]:
                  values[start] && values[start][0]
                    ? values[start][0].format('YYYY-MM-DD')
                    : undefined,
                [end]:
                  values[start] && values[start][1]
                    ? values[start][1].format('YYYY-MM-DD')
                    : undefined,
              }),
              values,
            ),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 清空
  const onClean = () => {
    form.resetFields();
    onSubmit();
  };

  useEffect(() => {
    if (Object.prototype.toString.call(fetchParams) === '[object Object]') {
      form.setFieldsValue(
        pick(fetchParams, Object.keys(form.getFieldsValue() || {})),
      );
    }
    onSubmit();
  }, []);

  return (
    <Card className="dp-searchgroup">
      <Form form={form}>
        <Row gutter={[0, 10]} align="middle" style={{ marginBottom: 10 }}>
          {fields.map((v, i) => (
            <Col
              key={
                typeof (v.label as LabelType) === 'string'
                  ? (v.label as string)
                  : v.label[0]
              }
              span={isCollapsed && i >= maxNum ? 0 : colSpan}
              style={{ paddingRight: 16 }}
            >
              <Form.Item
                label={v.name}
                name={
                  typeof (v.label as LabelType) === 'string'
                    ? (v.label as string)
                    : v.label[0]
                }
                style={{ width: '100%' }}
                initialValue={v.initialValue}
                {...setting.layout.formItemLayout}
              >
                <Field type={v.type} componentProps={v.componentProps} />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Row justify="end" align="middle">
          <Col span={colSpan} style={{ paddingRight: 16, textAlign: 'right' }}>
            <Button type="primary" onClick={onSubmit}>
              {setting.searchGroup.search}
            </Button>
            {fields.length > maxNum ? (
              <Button style={{ marginLeft: 8 }} onClick={toggleCollapse}>
                {isCollapsed
                  ? setting.searchGroup.moreSearch
                  : setting.searchGroup.hideSearch}
              </Button>
            ) : null}
            <Button style={{ marginLeft: 8 }} onClick={onClean}>
              {setting.searchGroup.clean}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

SearchGroup.defaultProps = {
  maxNum: 8,
};

export default SearchGroup;
