import React from 'react';
import { Row, Col, Card } from 'antd';
import CardImage from 'App/Components/CardImage';
import Description from 'App/Components/Description';
import { useDispatch } from 'react-redux';
import { selectCard } from 'App/Redux/modules/Search';

type IProps = {
  image?: string;
  truncatedNumber: string;
  cardCode: number;
};
export default function ResultCards({
  image,
  truncatedNumber,
  cardCode,
}: IProps) {
  const dispatch = useDispatch();

  return (
    <Card
      style={{ padding: '12px 12px 12px 0' }}
      hoverable
      type="inner"
      size="small"
      bordered
      onClick={() => {
        dispatch(selectCard(cardCode));
      }}
    >
      <Row type="flex" align="middle">
        <CardImage image={image} />
        <Description label="Número do Cartão" value={truncatedNumber} />
      </Row>
    </Card>
  );
}
