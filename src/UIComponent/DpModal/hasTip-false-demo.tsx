import React, { useState } from 'react';
import { Card, Button } from 'antd';
import DpModal from './index';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    console.log('handleCancel');
    setVisible(false);
  };

  const handleOk = () => {
    console.log('handleOk');
    setVisible(false);
  };

  return (
    <Card>
      <Button type="primary" onClick={handleClick}>
        Toggle弹框
      </Button>
      <DpModal
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        hasChange={false}
      >
        <p>111111111111111</p>
        <p>222222222222222</p>
        <p>333333333333333</p>
      </DpModal>
    </Card>
  );
};

export default Demo;
