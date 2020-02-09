import React from 'react';
import Weather from './Weather';
import { Row, Col, Divider } from 'antd';
import Search from './Search';
import FastAccess from './FastAccess';

export default function Dashboard() {
  return (
    <Row type="flex">
      <Col span={4}>
        <Weather />
        <Divider />
        <Search />
        <Divider />
        <FastAccess />
      </Col>
    </Row>
  );
}
