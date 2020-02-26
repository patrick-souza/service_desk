import React, { memo } from 'react';
import { Row, Divider, Card } from 'antd';
import Description from 'App/Components/Description';
import { IExtract } from 'App/Redux/modules/Extract';

type IProps = {
  transaction: IExtract;
};

function Content({ transaction }: IProps) {
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
            value={transaction.establishmentCode}
            span={5}
          />
          <Description
            label="Código do adquirente"
            value={transaction.acquirerCode}
            span={5}
          />
          <Description
            label="Código de transação"
            value={transaction.trasactionCode}
            span={5}
          />
          <Description label="On-line ou físico" value="" span={5} />
          <Description
            label="Data de liquidação"
            value={transaction.formatted_authorizationDate}
            span={4}
          />
        </Row>
      </Card>
    </>
  );
}

export default memo(Content);
