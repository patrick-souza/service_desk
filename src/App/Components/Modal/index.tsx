import React, { PropsWithChildren } from 'react';
import { Modal, Icon } from 'antd';

type IProps = {
  visible: boolean;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
};
export default function CustomModal({
  visible,
  onCancel,
  onOk,
  cancelText,
  okText,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <Modal
      mask
      centered
      visible={visible}
      okButtonProps={{
        size: 'large',
        loading: false,
      }}
      cancelButtonProps={{ size: 'large' }}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      destroyOnClose
      closeIcon={<Icon type="close" onClick={onCancel} />}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
}
