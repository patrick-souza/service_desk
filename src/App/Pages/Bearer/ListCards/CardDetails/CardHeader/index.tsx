import React from 'react';
import { ICard } from 'App/Redux/modules/Card';
import { Row, Col, Typography, Divider } from 'antd';
import Description from 'App/Components/Description';
import CardImage from 'App/Components/CardImage';
import Tier from './Tier';

export default function CardHeader({
  tier,
  truncate_number,
  formatted_balance,
  image,
}: Partial<ICard>) {
  return (
    <Row type="flex" align="middle">
      <CardImage image={image} data-test-id="teste" />
      <Col span={20}>
        <Row type="flex" align="middle" justify="space-between">
          {tier && (
            <Description
              label="Tier"
              value={
                <>
                  <Tier tier={tier} />
                  <Divider
                    type="vertical"
                    style={{ margin: '0 6px', height: 0 }}
                  />
                  <Typography.Text style={{ textTransform: 'capitalize' }}>
                    {tier}
                  </Typography.Text>
                </>
              }
            />
          )}
          <Description label="Número do Cartão" value={truncate_number} />
          <Description label="Saldo Disponivel" value={formatted_balance} />
        </Row>
      </Col>
    </Row>
  );
}
