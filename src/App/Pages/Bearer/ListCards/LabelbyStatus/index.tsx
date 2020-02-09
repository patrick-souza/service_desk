import React from 'react';
import { Row, Typography } from 'antd';
import LabelStatus from 'App/Components/LabelStatus';

export default function LabelbyStatus() {
  return (
    <Row type="flex" align="middle">
      <Typography.Text>Legenda :</Typography.Text>

      <LabelStatus state="A" />
      <LabelStatus state="C" />
      <LabelStatus state="P" />
      <LabelStatus state="B" />
    </Row>
  );
}
