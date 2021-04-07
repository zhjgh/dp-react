import { PropsWithChildren, useRef } from 'react';
import { Button } from 'antd';
import React from 'react';
import lang from '@/locales';
import { IRequestProps } from '@/global';

type buttonType = 'primary' | 'link' | 'text' | 'ghost' | 'default' | 'dashed';

export interface IDpExportProps extends IRequestProps {
  type?: buttonType; // 按钮类型
  name?: string; // 按钮名称
  encType?: string; // 编码方式
  disabled?: boolean; // 是否禁止点击
}

const DpExport: React.FC<PropsWithChildren<IDpExportProps>> = props => {
  const {
    type,
    reqUrl,
    method,
    reqParams = {},
    headers,
    name,
    encType,
    disabled,
    children,
  } = props;
  const formRef = useRef<null | any>(null);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    formRef.current.submit();
  };

  const allParams: {
    [key: string]: any;
  } = {
    ...reqParams,
    ...headers,
  };

  return (
    <form
      action={reqUrl}
      method={method}
      encType={encType}
      ref={formRef}
      target="_blank"
    >
      {Object.keys(allParams).map((v: string) => {
        return (
          allParams[v] && (
            <input type="hidden" name={v} value={allParams[v]} key={v} />
          )
        );
      })}
      {children || (
        <Button type={type} disabled={disabled} onClick={onSubmit}>
          {name}
        </Button>
      )}
    </form>
  );
};

DpExport.defaultProps = {
  type: 'primary',
  name: lang.exportName,
  method: 'post',
  encType: 'application/x-www-form-urlencoded',
  disabled: false,
};

export default DpExport;
