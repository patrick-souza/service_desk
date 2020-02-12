import React from 'react';
import { Row, Col, Card } from 'antd';
import Description from 'App/Components/Description';
import './index.css';
import { IExtract } from 'App/Redux/modules/Extract';

type IProps = {
  transactions: IExtract;
};

export default function Content(props: IProps) {
  return (
    <Card size="small" style={{ background: '#f4f4f4' }} bordered={false}>
      <Row type="flex" align="middle">
        <Description
          label="Código do estabelecimento"
          value={props.transactions.establishmentCode}
          span={3}
        />
        <Description
          label="Código do adquirente"
          value={props.transactions.acquirerCode || '-'}
          span={3}
        />
        <Description
          label="Código de transação"
          value={props.transactions.trasactionCode}
          span={3}
        />
        <Description label="On-line ou físico" value={'-'} span={3} />
        <Description
          label="Data de liquidação"
          value={props.transactions.formatted_authorizationDate}
          span={3}
        />
        <Col span={3} />
      </Row>
    </Card>
  );
}
