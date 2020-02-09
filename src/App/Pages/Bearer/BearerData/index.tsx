import React from 'react';
import { Card, Typography, Row, Divider, Icon } from 'antd';
import './index.css';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import Description from 'App/Components/Description';

export default function BearerData() {
  const { bearer, isLoading } = useSelector(
    (state: IApplicationState) => state.bearer
  );
  return (
    <Card loading={isLoading}>
      <Row type="flex" justify="space-between" align="middle">
        <Typography.Text strong>Dados Pessoais</Typography.Text>
        <Icon type="edit" style={{ cursor: 'pointer' }} />
      </Row>
      <Divider style={{ height: '0px' }} />
      <Description label="CPF" value={bearer.formatted_document} />
      <Description label="Nome Completo" value={bearer.name} />
      <Description label="Data Nascimento" value={bearer.formatted_born} />
      <Description label="Telefone" value={bearer.formatted_phone} />
      <Description label="Email" value={bearer.email} />
      <Description label="Endereço" value={bearer.address} />
    </Card>
  );
}
