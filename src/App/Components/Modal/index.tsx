import React, { PropsWithChildren } from 'react';
import { Modal, Icon } from 'antd';

type IProps = {
  visible: boolean;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
  title?: string | React.ReactNode;
  loading?: boolean;
};
export default function CustomModal({
  visible,
  onCancel,
  onOk,
  cancelText,
  okText,
  children,
  title,
  loading,
}: PropsWithChildren<IProps>) {
  return (
    <Modal
      title={title}
      mask
      centered
      visible={visible}
      okButtonProps={{
        size: 'large',
        loading,
        htmlType: 'submit',
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
