import React, { memo } from 'react';
import { Row, Card, Typography, Divider, Button } from 'antd';

function FastAccess() {
  return (
    <Row>
      <Card>
        <Typography.Text strong>Acesso Rápido</Typography.Text>
        <Divider style={{ height: '0px' }} />

        <Row type="flex" align="middle">
          <Button
            id="dashboard__synapse"
            block
            size="large"
            type="primary"
            onClick={(): void => {
              window.open(
                'http://hubfintech-synapse.xgen.com.br/Login.aspx?ReturnUrl=%2f'
              );
            }}
          >
            Acessar Synapse
          </Button>
        </Row>
        <Divider style={{ height: '0px' }} />
        <Row type="flex" align="middle">
          <Button
            id="dashboard__e-laerning"
            block
            size="large"
            type="primary"
            onClick={(): void => {
              window.open(
                'https://hubfintech-learning.xgen.com.br/#/login?returnUrl=%252F'
              );
            }}
          >
            Acessar E-learning
          </Button>
        </Row>
      </Card>
    </Row>
  );
}

export default memo(FastAccess);
