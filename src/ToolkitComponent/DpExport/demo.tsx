import React from 'react';
import Export from './index';

const Demo = () => {
  return (
    <Export
      name="下载导入模板"
      action="https://platform-gw-test.dragonpass.com.cn/boss/grant/equity/limousine/downloadTemplate"
      headers={{
        Token: localStorage.getItem('token'),
      }}
      method="get"
      encType="application/json"
      type="link"
    />
  );
};

export default Demo;
