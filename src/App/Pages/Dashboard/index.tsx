import React from 'react';
import { Row, Col, Divider } from 'antd';
import Weather from './Weather';
import Search from './Search';
import FastAccess from './FastAccess';

export default function Dashboard() {
  return (
    <Row type="flex">
      <Col span={4}>
        <Weather />
        <Divider style={{ margin: '12px 0' }} />
        <Search />
        <Divider style={{ margin: '12px 0' }} />
        <FastAccess />
      </Col>
    </Row>
  );
}
