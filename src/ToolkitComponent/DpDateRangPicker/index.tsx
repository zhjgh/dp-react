import React, { ForwardedRef, forwardRef } from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import { IDpDateRangPicker } from './index.d';
import styles from './index.less';

const { RangePicker } = DatePicker;

const labels = [
  {
    label: '今天',
    func: (onChange: any, format: string) =>
      onChange([moment().format(format), moment().format(format)]),
  },
  {
    label: '昨天',
    func: (onChange: any, format: string) =>
      onChange([
        moment()
          .add(-1, 'days')
          .format(format),
        moment().format(format),
      ]),
  },
  {
    label: '近7天',
    func: (onChange: any, format: string) =>
      onChange([
        moment()
          .add(-7, 'days')
          .format(format),
        moment().format(format),
      ]),
  },
  {
    label: '近30天',
    func: (onChange: any, format: string) =>
      onChange([
        moment()
          .add(-30, 'days')
          .format(format),
        moment().format(format),
      ]),
  },
  {
    label: '近一年',
    func: (onChange: any, format: string) =>
      onChange([
        moment()
          .add(-1, 'years')
          .format(format),
        moment().format(format),
      ]),
  },
];

function Dates(props: { onChange: any; format: string }) {
  const { onChange, format } = props;
  return (
    <span className={styles['dp-datepicker_choose']}>
      {labels.map(item => (
        <Button
          type="link"
          key={item.label}
          onClick={() => item.func(onChange, format)}
        >
          {item.label}
        </Button>
      ))}
    </span>
  );
}

const DpDateRangPicker = forwardRef(
  (props: IDpDateRangPicker, ref: ForwardedRef<any>) => {
    const { value, format = 'YYYY-MM-DD', showButtons, onChange } = props;
    return (
      <span ref={ref} className={styles['dp-datepicker']}>
        <RangePicker
          {...props}
          onChange={(v, vString) => onChange && onChange(vString)}
          value={
            value?.length && value?.every(_ => _)
              ? [moment(value[0]), moment(value[1])]
              : null
          }
        />
        {showButtons && <Dates onChange={onChange} format={format} />}
      </span>
    );
  },
);

DpDateRangPicker.defaultProps = {
  showButtons: true,
};

export default DpDateRangPicker;
