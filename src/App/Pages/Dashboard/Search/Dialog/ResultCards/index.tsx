import React, { memo } from 'react';
import { Row, Card } from 'antd';
import CardImage from 'App/Components/CardImage';
import Description from 'App/Components/Description';
import { useDispatch } from 'react-redux';
import { selectCard } from 'App/Redux/modules/Search';

type IProps = {
  image?: string;
  truncatedNumber: string;
  cardCode: string;
  id: string;
};
function ResultCards({ image, truncatedNumber, cardCode, id }: IProps) {
  const dispatch = useDispatch();

  return (
    <Card
      id={id}
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

export default memo(ResultCards);
