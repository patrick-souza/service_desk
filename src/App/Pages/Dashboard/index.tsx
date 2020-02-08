import React from 'react';
import Weather from './Weather';
import { Row } from 'antd';

export default function Dashboard() {
  return (
    <Row type="flex">
      <Weather />
    </Row>
  );
}
