import React from 'react';
import { Row, Typography, Divider } from 'antd';
type IProps = {
  label: string;
  value: string;
};
export default function Description({ label, value }: IProps) {
  return (
    <>
      <Row type="flex">
        <Typography.Text strong>{label} : </Typography.Text>
      </Row>
      <Row type="flex">
        <Typography.Text>{value || '-'}</Typography.Text>
      </Row>
      <Divider style={{ height: '0px', margin: '12px 0px' }} />
    </>
  );
}
