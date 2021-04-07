import React from 'react';
import DpCascaderArea from './index';

const Demo = () => {
  return (
    <DpCascaderArea
      isFliter={true}
      isRequest={true}
      reqUrl="https://platform-gw-test.dragonpass.com.cn/boss/base/baseData/getAreaListNonStandard"
      reqParams={{
        level: '1,2,3,4,5,6', // 1洲2国家3地域4省州5城市6县区域
      }}
    />
  );
};

export default Demo;
