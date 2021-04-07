import React from 'react';
import DpInputNumber from './index';

const Demo = () => {
  return (
    <DpInputNumber
      wrapStyle={{ border: '2px #000 solid' }}
      inputStyle={{ background: 'yellow', paddingLeft: '100px' }}
      prefix="xx"
      prefixStyle={{ width: '100px', border: '1px red solid' }}
      suffix="yy"
      suffixStyle={{ width: '50px', border: '1px green solid' }}
      defaultValue={1000}
      disabled={false}
    />
  );
};

export default Demo;
