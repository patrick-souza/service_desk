import React from 'react';
import { Row, Col } from 'antd';
import BearerData from './BearerData';

export default function Bearer() {
  return (
    <Row type="flex">
      <Col span={6}>
        <BearerData />
      </Col>
    </Row>
  );
}
