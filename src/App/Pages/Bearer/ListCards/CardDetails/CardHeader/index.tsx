import React, { useState } from 'react';
import { ICard } from 'App/Redux/modules/Card';
import { Row, Col } from 'antd';
import Description from 'App/Components/Description';
import cardNotFound from 'assets/cardNotFound.jpg';

export default function CardHeader({
  tier,
  truncate_number,
  formatted_balance,
  image,
  loading,
}: Partial<ICard> & { loading: boolean }) {
  const [errorImage, setErrorImage] = useState(false);
  return (
    <Row type="flex" align="middle">
      <Col
        span={2}
        style={{
          display: 'flex',
          width: 102,
          height: 64,
          margin: '0 24px 6px 16px',
        }}
      >
        <img
          src={errorImage ? cardNotFound : image}
          width={102}
          height={64}
          alt="card"
          onError={() => setErrorImage(true)}
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
  );
}
