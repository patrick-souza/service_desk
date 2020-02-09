import React, { useContext } from 'react';
import { Row, Radio, Card, Typography } from 'antd';
import CardContext from '../CardContext';

export default function FilterByStatus() {
  const { setFilter, filter } = useContext(CardContext);
  return (
    <Card
      type="inner"
      size="small"
      style={{ width: '100%', margin: '8px 0px', maxHeight: '60px' }}
    >
      <Row type="flex" align="middle" justify="space-between">
        <Radio.Group
          defaultValue={filter}
          buttonStyle="solid"
          onChange={e => setFilter(e.target.value)}
        >
          <Radio.Button value="T">Total</Radio.Button>
          <Radio.Button value="A">Ativos</Radio.Button>
          <Radio.Button value="C">Cancelados</Radio.Button>
          <Radio.Button value="P">Pré-Bloqueio</Radio.Button>
          <Radio.Button value="B">Bloqueados</Radio.Button>
        </Radio.Group>
        <Typography.Text>
          <strong>Nº De Conta</strong> 1/10
        </Typography.Text>
      </Row>
    </Card>
  );
}
