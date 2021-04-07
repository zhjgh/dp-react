import React, { useState, createContext, useEffect, useCallback } from 'react';
import DpTree from './index';
import axios from 'axios';

const Demo = () => {
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
          'https://platform-gw-test.dragonpass.com.cn/boss/supplier/info/getTree',
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

  const handleChange = (v: string[]) => {
    console.log(v);
  };

  return (
    <DpTree
      title="客户组织树"
      treeSource={options}
      value={['4375']}
      onChange={handleChange}
    />
  );
};

export default Demo;
