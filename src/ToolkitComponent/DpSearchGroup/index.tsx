import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Card, Form, Row, Col, Button } from 'antd';
import { IDpSearchGroupProps, LabelType, SelectField } from './index.d';
import DpField from './DpField';
import lang from '@/locales';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const DpSearchGroup: React.FC<PropsWithChildren<
  IDpSearchGroupProps
>> = props => {
  const { maxNum = 8, onSearch, isClean = false, colSpan = 6 } = props;
  const [form] = Form.useForm();
  const [isCollapsed, toggleCollapse] = useReducer(state => !state, true);

  useEffect(() => {
    if (isClean) {
      handleClean();
    }
  }, [isClean]);

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
            (item.type === 'rangePicker' && [lang.startTime, lang.endTime]) ||
            (item.type === 'select' && `${lang.pleaseSelect}`) ||
            `${lang.pleaseInput}`,
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
  const handleSearch = () => {
    form
      .validateFields()
      .then(values => {
        console.log('values', values);
        onSearch(
          {
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
          },
          true,
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 清空
  const handleClean = () => {
    form.resetFields();
    handleSearch();
  };

  return (
    <Card>
      <Form form={form}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {fields.map((v, i) => (
            <Col
              className="gutter-row"
              key={
                typeof (v.label as LabelType) === 'string'
                  ? (v.label as string)
                  : v.label[0]
              }
              // span={isCollapsed && i >= maxNum ? 0 : colSpan}
              // span={6}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={6}
            >
              <Form.Item
                label={
                  typeof (v.label as LabelType) === 'string'
                    ? (v.label as string)
                    : v.label[0]
                }
                name={v.name}
                style={{ width: '100%' }}
                initialValue={v.initialValue}
                {...formItemLayout}
              >
                {v.type === 'self' ? (
                  v.component
                ) : (
                  <DpField type={v.type} componentProps={v.componentProps} />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Row justify="end" align="middle">
          <Col>
            <Button
              type="primary"
              onClick={handleSearch}
              style={{ marginRight: '10px' }}
            >
              {lang.search}
            </Button>
            {fields.length > maxNum ? (
              <Button onClick={toggleCollapse} style={{ marginRight: '10px' }}>
                {isCollapsed ? lang.moreSearch : lang.lessSearch}
              </Button>
            ) : null}
            <Button onClick={handleClean}>{lang.clean}</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DpSearchGroup;
