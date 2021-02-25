// @ts-nocheck
import React, { useMemo, useReducer, useEffect } from 'react'
import { Card, Form, Row, Col, Button } from 'antd'
import { SearchGroupProps, LabelType, SelectField } from '.'
import Field from '../Field'
import { pick } from 'lodash'
import setting from './setting'

const SearchGroup: React.FC<SearchGroupProps> = props => {
  const [form] = Form.useForm()
  const { maxNum, colSpan, onSearch, extraParams } = props

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
              setting.text.startTime,
              setting.text.endTime,
            ]) ||
            (item.type === 'select' && setting.text.pleaseSelect) ||
            `${setting.text.pleaseInput}${item.name}`,
          options:
            Object.prototype.toString.call((item as SelectField).options) ===
            '[object Array]'
              ? (item as SelectField).options
              : Object.prototype.toString.call(
                  (item as SelectField).options
                ) === '[object Object]'
              ? Object.entries(
                  (item as SelectField).options
                ).map(([name, value]) => ({ name, value }))
              : [],
        },
      })),
    [props.fields]
  )
  const [isCollapsed, toggleCollapse] = useReducer(state => !state, true)

  // 查询
  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        onSearch({
          ...(extraParams || {}),
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
              values
            ),
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // 清空
  const onClean = () => {
    form.resetFields()
    onSubmit()
  }

  useEffect(() => {
    if (Object.prototype.toString.call(extraParams) === '[object Object]') {
      form.setFieldsValue(
        pick(extraParams, Object.keys(form.getFieldsValue() || {}))
      )
    }
    onSubmit()
  }, [])

  return (
    <Card>
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
                <Field
                  type={v.type}
                  componentProps={v.componentProps}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Row justify="end" align="middle">
          <Col span={colSpan} style={{ paddingRight: 16, textAlign: 'right' }}>
            <Button type="primary" onClick={onSubmit}>
              {setting.text.search}
            </Button>
            {fields.length > maxNum ? (
              <Button style={{ marginLeft: 8 }} onClick={toggleCollapse}>
                {isCollapsed
                  ? setting.text.moreSearch
                  : setting.text.hideSearch}
              </Button>
            ) : null}
            <Button style={{ marginLeft: 8 }} onClick={onClean}>
              {setting.text.clean}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

SearchGroup.defaultProps = {
  colSpan: 6,
  maxNum: 8,
}

export default SearchGroup
