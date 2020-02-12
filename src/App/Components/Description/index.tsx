import React, { ReactNode } from 'react';
import { Row, Typography, Divider, Col, Icon } from 'antd';
type IProps = {
  label: string;
  value: string | ReactNode;
  extraAction?: () => void;
  span?: number;
};
export default function Description({
  label,
  value,
  extraAction,
  span,
}: IProps) {
  return (
    <Col span={span}>
      <Row type="flex" align="middle">
        <Typography.Text strong>{label}</Typography.Text>
        <Divider type="vertical" style={{ height: 0, margin: '0 4px' }} />
        {extraAction && <Icon type="link" onClick={extraAction} />}
      </Row>
      <Row type="flex">
        {React.isValidElement(value) ? (
          value
        ) : (
          <Typography.Text>{value || '-'}</Typography.Text>
        )}
      </Row>
      <Divider style={{ height: '0px', margin: '12px 0px' }} />
    </Col>
  );
}
