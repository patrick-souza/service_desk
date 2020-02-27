import React from 'react';
import { Row, Col, Typography, Button, Icon } from 'antd';
import error401 from 'assets/error401.svg';
import './index.css';
import history from 'App/Util/history';

export default function Page401() {
  return (
    <Col span={24} style={{ height: '100vh' }}>
      <Row type="flex" justify="center" align="middle">
        <Typography.Title level={2}>Oops !</Typography.Title>
      </Row>
      <Row type="flex" justify="center" align="middle">
        <img src={error401} alt="" />
      </Row>
      <Row type="flex" justify="center" align="middle">
        <Typography.Text type="secondary" disabled>
          Você não tem autorização para acessar essa página
        </Typography.Text>
      </Row>
      <Row type="flex" justify="center" align="middle">
        <Button type="primary" size="large" onClick={() => history.push('/')}>
          <Icon type="login" />
          Fazer Login
        </Button>
      </Row>
    </Col>
  );
}
