import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';

export default function Historic() {
  const { historic, historicLoading } = useSelector(
    (state: IApplicationState) => state.historicResendPassword
  );
  const columns = [
    {
      title: 'Responsável',
      dataIndex: 'user',
      key: '_id',
    },
    {
      title: 'Motivo',
      dataIndex: 'payload.situacao.situacao',
      key: 'payload.situacao.situacao',
    },
    {
      title: 'Data e Hora',
      dataIndex: 'formatted_createdAt',
      key: 'formatted_createdAt',
    },
  ];
  return (
    <Table
      loading={historicLoading}
      dataSource={historic}
      rowKey={row => row._id}
      columns={columns}
    />
  );
}
