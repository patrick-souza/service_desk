import React from 'react';
import { Card, Typography, Row, Divider } from 'antd';
import './index.css';
import Description from './Description';
export default function BearerData() {
  return (
    <Card>
      <Row type="flex">
        <Typography.Text strong>Dados Pessoais</Typography.Text>
      </Row>
      <Divider style={{ height: '0px' }} />
      <Description label="CPF" value="450.764.258-21" />
      <Description label="Nome Completo" value="Patrick Pereira de Souza" />
      <Description label="Data Nascimento" value="17/10/1996" />
      <Description label="Telefone" value="(15) 99106-2937" />
      <Description label="Email" value="patrick.souza@gmail.com" />
      <Description
        label="Endereço"
        value="Rua antonio perez hernandes, 1190 Campolim - Sorocaba, SP 18048-115"
      />
    </Card>
  );
}
