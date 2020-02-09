import React from 'react';
import { Row, Button, Divider } from 'antd';

type IProps = {
  cardCode: number;
};
export default function CardActions({ cardCode }: IProps) {
  return (
    <Row type="flex">
      <Button size="large">Senhas</Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button size="large">Reemitir</Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button size="large">Cancelar</Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button size="large">Bloquear</Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button size="large">Pedidos</Button>
      <Divider type="vertical" style={{ height: 0 }} />
    </Row>
  );
}
