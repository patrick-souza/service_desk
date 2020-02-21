import React from 'react';
import { Modal, Icon, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { hideDialogCharacteristics } from 'App/Redux/modules/Card';
import { IApplicationState } from 'App/Redux/modules';

export default function CharacteristicDialog() {
  const { openDialog, characteristics, loadingCharacteristics } = useSelector(
    (state: IApplicationState) => state.card
  );

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Valor',
      dataIndex: 'formatted_value',
      key: 'formatted_value',
      render: (formatted_value: boolean | string) => {
        if (typeof formatted_value === 'boolean') {
          return (
            <Icon
              type={formatted_value ? 'check-circle' : 'stop'}
              theme="twoTone"
              twoToneColor={formatted_value ? '#52c41a' : '#DB2E2E'}
            />
          );
        }
        return formatted_value;
      },
    },
  ];

  return (
    <Modal
      visible={openDialog}
      width={700}
      cancelText="Cancelar"
      onCancel={() => {
        dispatch(hideDialogCharacteristics());
      }}
      title="CARACTERÍSTICAS"
    >
      <Table
        loading={loadingCharacteristics}
        dataSource={characteristics}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
}
