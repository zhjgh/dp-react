import React from 'react';
import DpAsyncExport from './index';

const Demo = () => {
  return (
    <DpAsyncExport
      url="https://platform-gw-test.dragonpass.com.cn/boss/grant/equity/limousine/downloadTemplate"
      headers={{
        Token: localStorage.getItem('token'),
      }}
      contentType="application/json"
      name="导出"
      fileName="司机黑名单.xlsx"
      method="get"
      type="primary"
    />
  );
};

export default Demo;
