import React from 'react';
import { Row, Card, Typography, Input, Divider } from 'antd';
import Dialog from './Dialog';
import { useDispatch } from 'react-redux';
import { showDialog } from 'App/Redux/modules/Search';

export default function Search() {
  const dispatch = useDispatch();

  return (
    <Row>
      <Card>
        <Typography.Text strong>Busca</Typography.Text>
        <Divider style={{ height: '0px' }} />
        <Row type="flex" align="middle">
          <Input.Search
            placeholder="CPF, CNPJ, ID do cartão e conta"
            onFocus={() => {
              dispatch(showDialog());
            }}
            enterButton
          />
        </Row>
      </Card>
      <Dialog />
    </Row>
  );
}
