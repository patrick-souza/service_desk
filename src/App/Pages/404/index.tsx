import React from 'react';
import { Row, Col, Typography, Button, Icon } from 'antd';
import error404 from 'assets/error404.svg';
import './index.css';
import history from 'App/Util/history';

export default function Page404() {
  return (
    <Col span={24} style={{ height: '100vh' }}>
      <Row type="flex" justify="center" align="middle">
        <Typography.Title level={2}>Oops !</Typography.Title>
      </Row>
      <Row type="flex" justify="center" align="middle">
        <img src={error404} alt="" />
      </Row>
      <Row type="flex" justify="center" align="middle">
        <Typography.Text type="secondary" disabled>
          A página que você está procurando não existe.
        </Typography.Text>
      </Row>
      <Row type="flex" justify="center" align="middle">
        <Button type="primary" size="large" onClick={() => history.goBack()}>
          <Icon type="arrow-left" />
          Voltar
        </Button>
      </Row>
    </Col>
  );
}
