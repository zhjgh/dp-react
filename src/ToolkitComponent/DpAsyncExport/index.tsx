import { Button } from 'antd';
import axios from 'axios';
import React from 'react';
import lang from '@/locales';
import { IRequestProps } from '@/global';

type buttonType = 'primary' | 'link' | 'text' | 'ghost' | 'default' | 'dashed';

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export interface IAsyncExportProps extends IRequestProps {
  btnType?: buttonType; // 按钮类型
  btnName?: string; // 按钮名称
  disabled?: boolean; // 按钮禁止点击
  encType?: string; // 编码格式
  fileName?: string; // 文件命名
  responseType?: ResponseType; // 返回格式
}

const DpAsyncExport = ({
  method,
  headers,
  reqUrl,
  reqParams,
  responseType = 'blob',
  encType = 'application/json;charset=UTF-8',
  btnName,
  btnType,
  disabled,
  fileName = '导出文件.xlsx',
}: IAsyncExportProps) => {
  // 请求拦截
  axios.interceptors.request.use(
    config => {
      // 添加headers
      const headersConfig = {
        ...headers,
        contentType: encType,
      };
      config.headers = headersConfig;
      return config;
    },
    err => {
      return Promise.reject(err);
    },
  );

  const otherProps: any = {};
  if (disabled) {
    otherProps.disabled = true;
  }

  const onSubmit = () =>
    axios({
      method,
      url: reqUrl,
      data: reqParams,
      responseType,
    }).then((res: any) => {
      const link = document.createElement('a');
      link.style.display = 'none';
      const url = window.URL.createObjectURL(new Blob([res.data]));
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  return (
    <Button type={btnType} {...otherProps} onClick={onSubmit}>
      {btnName}
    </Button>
  );
};

DpAsyncExport.defaultProps = {
  btnName: lang.exportName,
  btnType: 'primary',
  method: 'get',
  disabled: false,
};

export default DpAsyncExport;
