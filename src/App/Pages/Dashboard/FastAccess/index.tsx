import React from 'react';
import { Row, Card, Typography, Divider, Button } from 'antd';

export default function FastAccess() {
  return (
    <Row>
      <Card>
        <Typography.Text strong>Acesso Rápido</Typography.Text>
        <Divider style={{ height: '0px' }} />

        <Row type="flex" align="middle">
          <Button block size="large" type="primary">
            Acessar Synapse
          </Button>
        </Row>
        <Divider style={{ height: '0px' }} />
        <Row type="flex" align="middle">
          <Button block size="large" type="primary">
            Acessar E-laerning
          </Button>
        </Row>
      </Card>
    </Row>
  );
}
