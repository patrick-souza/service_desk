import React from 'react';
import { Row, Skeleton, Col, Collapse } from 'antd';

export default function ContentHeaderSkeleton() {
  return (
    <Collapse.Panel
      header={
        <Row type="flex" align="middle" style={{ marginRight: '-20px' }}>
          <Col span={5}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
          <Col span={5}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
          <Col span={5}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
          <Col span={5}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
          <Col span={4}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        </Row>
      }
      key=""
      style={{
        background: '#fff',
        marginBottom: '16px',
        border: 0,
      }}
    />
  );
}
