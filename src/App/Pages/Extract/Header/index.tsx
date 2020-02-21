import React from 'react';
import { Row, Typography, Col, Divider } from 'antd';
import Breadcrumb from 'App/Components/Breadcrumb';
import Filter from './Filter';

export default function ExtractHeader() {
  return (
    <>
      <Breadcrumb
        pages={[
          { path: 'dashboard', breadcrumbName: 'Home' },
          { path: 'bearer', breadcrumbName: 'Cartões' },
          { path: 'extract', breadcrumbName: 'Extrato' },
        ]}
      />
      <Divider style={{ margin: '12px 0', height: 0 }} />
      <Row type="flex" align="middle" justify="space-between">
        <Filter />
        <Col span={12}>
          <Row type="flex" justify="end">
            <Typography.Text strong>Saldo Total</Typography.Text>
          </Row>
          <Row type="flex" justify="end">
            <Typography.Title level={3}>R$ 0,00</Typography.Title>
          </Row>
        </Col>
      </Row>
    </>
  );
}
