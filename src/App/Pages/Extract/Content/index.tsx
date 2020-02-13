import React from 'react';
import { Row, Divider, Card } from 'antd';
import Description from 'App/Components/Description';
import { IExtract } from 'App/Redux/modules/Extract';

type IProps = {
  transactions: IExtract;
};

export default function Content(props: IProps) {
  return (
    <>
      <Divider style={{ marginTop: '0px', marginBottom: '12px' }} />
      <Card
        size="small"
        bordered={false}
        bodyStyle={{ borderRadius: '4px', background: '#f4f4f4' }}
      >
        <Row type="flex" align="middle">
          <Description
            label="Código do estabelecimento"
            value={props.transactions.establishmentCode}
            span={5}
          />
          <Description
            label="Código do adquirente"
            value={props.transactions.acquirerCode || '-'}
            span={5}
          />
          <Description
            label="Código de transação"
            value={props.transactions.trasactionCode}
            span={5}
          />
          <Description label="On-line ou físico" value={'-'} span={5} />
          <Description
            label="Data de liquidação"
            value={props.transactions.formatted_authorizationDate}
            span={4}
          />
        </Row>
      </Card>
    </>
  );
}
