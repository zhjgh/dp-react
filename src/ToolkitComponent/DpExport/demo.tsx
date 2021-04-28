import React from 'react';
import Export from './index';

const Demo = () => {
  return (
    <Export
      name="下载导入模板"
      action="http://platform-gateway.platform.svc.dragon/boss/grant/equity/limousine/downloadTemplate"
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
