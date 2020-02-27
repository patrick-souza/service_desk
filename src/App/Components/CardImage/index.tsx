import React, { useState, memo } from 'react';
import { Col } from 'antd';
import cardNotFound from 'assets/cardNotFound.jpg';

function CardImage({ image, id }: { image?: string; id?: string }) {
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
        id={id}
        src={errorImage ? cardNotFound : image}
        width={102}
        height={64}
        alt="card"
        onError={() => setErrorImage(true)}
      />
    </Col>
  );
}

export default memo(CardImage);
