import React from 'react';
import { Row, Col } from 'antd';
import BearerData from './BearerData';
import ListCards from './ListCards';

export default function Bearer() {
  return (
    <Row type="flex">
      <Col span={4} xl={5} xxl={4}>
        <BearerData />
      </Col>
      <Col span={20} xl={19} xxl={20} style={{ padding: '0px 20px' }}>
        <ListCards />
      </Col>
    </Row>
  );
}
