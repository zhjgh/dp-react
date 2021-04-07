import React, { PropsWithChildren } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import lang from '@/locales';
import styles from './index.less';
import { ModalProps } from 'antd/lib/modal';

const { confirm } = Modal;

export interface IDpModalProps extends ModalProps {
  width?: number;
  large?: boolean;
  hasChange?: boolean;
  onCancel?(): void;
}

const DpModal: React.FC<PropsWithChildren<IDpModalProps>> = props => {
  const {
    width = 560,
    large,
    hasChange,
    onCancel,
    children,
    ...restProps
  } = props;

  let _width = width;
  if (large) {
    _width = 824;
  }

  const cancel = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: lang.content,
      okText: lang.okText,
      cancelText: lang.cancelText,
      onOk: () => {
        console.log('onOk');
        onCancel && onCancel();
      },
    });
  };

  return (
    <Modal
      centered
      className={styles['dp-modal']}
      width={_width}
      maskClosable={false}
      {...restProps}
      onCancel={() => {
        if (hasChange) {
          cancel();
        } else {
          onCancel && onCancel();
        }
      }}
    >
      {children}
    </Modal>
  );
};

export default React.memo(DpModal);
