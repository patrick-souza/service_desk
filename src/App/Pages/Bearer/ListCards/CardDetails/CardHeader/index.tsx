import React from 'react';
import { ICard } from 'App/Redux/modules/Card';
import { Card, Row, Col } from 'antd';
import Description from 'App/Components/Description';
import cardNotFound from 'assets/cardNotFound.jpg';

export default function CardHeader({
  tier,
  truncate_number,
  formatted_balance,
  image,
}: Partial<ICard>) {
  return (
    <Card bordered={false} type="inner">
      <Row type="flex" align="middle">
        <Col
          span={2}
          style={{
            display: 'flex',
            width: 102,
            height: 64,
            margin: '0 24px 0 4px',
          }}
        >
          <img
            src={image || cardNotFound}
            width={102}
            height={64}
            alt="card "
          />
        </Col>
        <Col span={20}>
          <Row type="flex" align="middle" justify="space-between">
            <Description label="Tier" value={tier} />
            <Description label="Número do Cartão" value={truncate_number} />
            <Description label="Saldo Disponivel" value={formatted_balance} />
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
