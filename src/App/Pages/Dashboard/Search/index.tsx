import React from 'react';
import { Row, Card, Typography, Input, Divider } from 'antd';

export default function Search() {
  return (
    <Row>
      <Card>
        <Typography.Text strong>Busca</Typography.Text>
        <Divider style={{ height: '0px' }} />
        <Row type="flex" align="middle">
          <Input.Search
            placeholder="CPF, CNPJ, ID do cartão e conta"
            onFocus={() => {
              console.log('on focus');
            }}
            enterButton
          />
        </Row>
      </Card>
    </Row>
  );
}
