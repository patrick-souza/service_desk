import React, { memo } from 'react';
import { Row, Typography, Col, Divider } from 'antd';
import Breadcrumb from 'App/Components/Breadcrumb';
import Filter from './Filter';

type IProps = {
  balance: string;
};
function ExtractHeader({ balance }: IProps) {
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
        <Col span={12} xl={4} xxl={12}>
          <Row type="flex" justify="end">
            <Typography.Text strong>Saldo Total</Typography.Text>
          </Row>
          <Row type="flex" justify="end">
            <Typography.Title level={3}>{balance}</Typography.Title>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default memo(ExtractHeader);
