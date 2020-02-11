import React from 'react';
import { ICard } from 'App/Redux/modules/Card';
import { Row, Col } from 'antd';
import Description from 'App/Components/Description';
import CardImage from 'App/Components/CardImage';

export default function CardHeader({
  tier,
  truncate_number,
  formatted_balance,
  image,
}: Partial<ICard>) {
  return (
    <Row type="flex" align="middle">
      <CardImage image={image} />
      <Col span={20}>
        <Row type="flex" align="middle" justify="space-between">
          <Description label="Tier" value={tier} />
          <Description label="Número do Cartão" value={truncate_number} />
          <Description label="Saldo Disponivel" value={formatted_balance} />
        </Row>
      </Col>
    </Row>
  );
}
