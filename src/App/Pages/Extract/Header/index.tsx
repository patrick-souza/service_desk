import React from 'react';
import { Row, Typography, Col, Card, Radio, Divider, DatePicker } from 'antd';
import history from 'App/Util/history';
import Breadcrumb from 'App/Components/Breadcrumb';
const { RangePicker } = DatePicker;

export default function ExtractHeader() {
  console.log(history);
  return (
    <>
      <Breadcrumb
        routes={[
          { path: 'dashboard', breadcrumbName: 'Home' },
          { path: 'bearer', breadcrumbName: 'Cartões' },
          { path: 'extract', breadcrumbName: 'Extrato' },
        ]}
      />
      <Divider style={{ margin: '12px 0' }} />
      <Row type="flex" align="middle" justify="space-between">
        <Col span={12}>
          <Card size="small" bordered={false}>
            <Row type="flex" justify="space-between">
              <Radio.Group defaultValue="ewq" buttonStyle="solid">
                <Radio.Button value="T">Hoje</Radio.Button>
                <Radio.Button value="A">30 dias</Radio.Button>
                <Radio.Button value="C">60 dias</Radio.Button>
                <Radio.Button value="P">90 dias</Radio.Button>
              </Radio.Group>
              <div>
                <Typography.Text strong>Por data:</Typography.Text>
                <Divider type="vertical" style={{ height: 0 }} />
                <RangePicker />
              </div>
            </Row>
          </Card>
        </Col>
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
