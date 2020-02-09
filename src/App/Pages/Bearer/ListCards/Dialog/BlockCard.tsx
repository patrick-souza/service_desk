import React from 'react';
import { Modal, Typography } from 'antd';

export default function BlockCard() {
  return (
    <Modal
      mask
      title={<Typography.Text strong>Buscar</Typography.Text>}
      centered
      visible={true}
      okButtonProps={{
        title: 'Buscar',
        size: 'large',
        loading: false,
      }}
      cancelButtonProps={{ title: 'Cancelar', size: 'large' }}
      okText="Buscar"
      cancelText="Cancelar"
      onOk={() => {}}
      onCancel={() => {}}
    ></Modal>
  );
}
