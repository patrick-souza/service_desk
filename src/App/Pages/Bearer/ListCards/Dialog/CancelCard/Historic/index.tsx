import React, { memo } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';

function Historic() {
  const { historicLoading, historic } = useSelector(
    (state: IApplicationState) => state.cancelCard
  );
  const columns = [
    {
      title: 'Responsável',
      dataIndex: 'user.name',
      key: '_id',
    },
    {
      title: 'Motivo',
      dataIndex: 'payload.situacao.nome',
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
export default memo(Historic);
