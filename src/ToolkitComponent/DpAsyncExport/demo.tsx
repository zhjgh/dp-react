import React from 'react';
import DpAsyncExport from './index';

const Demo = () => {
  return (
    <DpAsyncExport
      reqUrl="http://platform-gateway.platform.svc.dragon/boss/grant/equity/limousine/downloadTemplate"
      headers={{
        Token: localStorage.getItem('token'),
      }}
      encType="application/json"
      btnName="导出"
      fileName="司机黑名单.xlsx"
      method="get"
      btnType="primary"
    />
  );
};

export default Demo;
