import React, { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { Switch } from 'antd';
import lang from '@/locales';
import { SwitchProps } from 'antd/lib/switch';

export interface IDpSwitchProps extends SwitchProps {
  value?: any;
  onChange?(v: any): void;
}

const DpSwitch = forwardRef((props: IDpSwitchProps, ref: ForwardedRef<any>) => {
  const { value, onChange, ...restProps } = props;

  return (
    <span ref={ref}>
      <Switch
        checkedChildren={lang.yes}
        unCheckedChildren={lang.no}
        onChange={v => onChange && onChange(v)}
        defaultChecked={value}
        {...restProps}
      />
    </span>
  );
});

export default DpSwitch;
