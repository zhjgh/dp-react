import React, { ForwardedRef, forwardRef } from 'react';
import { InputNumber } from 'antd';
import styles from './index.less';
import lang from '@/locales';
import { InputNumberProps } from 'antd/lib/input-number';

export interface IDpInputNumberProps extends InputNumberProps {
  wrapStyle?: React.CSSProperties; // 外层样式
  inputStyle?: React.CSSProperties; // input样式
  prefix?: string; // 前缀内容
  prefixStyle?: React.CSSProperties; // 前缀样式
  suffix?: string; // 后缀内容
  suffixStyle?: React.CSSProperties; // 后缀样式
}

const DpInputNumber = forwardRef(
  (props: IDpInputNumberProps, ref: ForwardedRef<any>) => {
    const {
      prefix,
      wrapStyle,
      suffix,
      suffixStyle,
      prefixStyle,
      inputStyle,
      disabled,
      ...restProps
    } = props;

    return (
      <span ref={ref} className={styles['dp-inputNumber']} style={wrapStyle}>
        {prefix && (
          <span className={`${styles['dp-prefix']}`} style={prefixStyle}>
            {prefix}
          </span>
        )}
        <InputNumber
          style={inputStyle}
          disabled={disabled}
          placeholder={!disabled ? lang.pleaseInput : ''}
          {...restProps}
        />
        {suffix && (
          <span className={styles['dp-suffix']} style={suffixStyle}>
            {suffix}
          </span>
        )}
      </span>
    );
  },
);

export default DpInputNumber;
