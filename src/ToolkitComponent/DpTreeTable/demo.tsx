import React, { useState, createContext, useEffect, useCallback } from 'react';
import DpTreeTable from './index';
import axios from 'axios';

const Demo = () => {
  const context = createContext({});
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('supplierInfo');
    const supplierInfo = data && JSON.parse(data);
    if (supplierInfo) {
      setOptions(supplierInfo);
      return;
    } else {
      axios({
        method: 'post',
        url:
          'http://platform-gateway.platform.svc.dragon/boss/supplier/info/getTree',
        data: { lg: 'zh-cn' },
        headers: {
          Token: localStorage.getItem('token'),
        },
      }).then(res => {
        if (res.data.state === '1') {
          const data = res.data.result.children;
          setOptions(data);
          localStorage.setItem('supplierInfo', JSON.stringify(data));
        }
      });
    }
  }, []);

  return (
    <DpTreeTable context={context} title="客户组织树" treeSource={options} />
  );
};

export default Demo;
