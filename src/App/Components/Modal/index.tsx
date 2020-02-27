import React, { PropsWithChildren, memo } from 'react';
import { Modal, Icon } from 'antd';

type IProps = {
  visible: boolean;
  okText?: string;
  cancelText: string;
  onOk?: () => void;
  onCancel: () => void;
  title?: string | React.ReactNode;
  loading?: boolean;
  width?: number | string;
  okId?: string;
  cancelId?: string;
};
function CustomModal({
  visible,
  onCancel,
  onOk,
  cancelText,
  okText,
  children,
  title,
  loading,
  width,
  okId,
  cancelId,
}: PropsWithChildren<IProps>) {
  return (
    <Modal
      width={width}
      title={title}
      mask
      centered
      visible={visible}
      okButtonProps={{
        size: 'large',
        loading,
        htmlType: 'submit',
        disabled: !onOk,
        id: okId,
      }}
      cancelButtonProps={{ size: 'large', id: cancelId }}
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

export default memo(CustomModal);
