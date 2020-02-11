import React, { useState } from 'react';
import { Col } from 'antd';
import cardNotFound from 'assets/cardNotFound.jpg';

export default function CardImage({ image }: { image?: string }) {
  const [errorImage, setErrorImage] = useState(false);

  return (
    <Col
      span={2}
      style={{
        display: 'flex',
        width: 102,
        height: 64,
        margin: '0 24px',
      }}
    >
      <img
        src={errorImage ? cardNotFound : image}
        width={102}
        height={64}
        alt="card image"
        onError={() => setErrorImage(true)}
      />
    </Col>
  );
}
