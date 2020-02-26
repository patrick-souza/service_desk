import React, { memo } from 'react';
import { Row } from 'antd';
import Description from 'App/Components/Description';
import { IExtract } from 'App/Redux/modules/Extract';

type IProps = {
  transaction: IExtract;
};

function ContentHeader({ transaction }: IProps) {
  return (
    <Row type="flex" align="middle" style={{ marginRight: '-20px' }}>
      <Description
        label="Estabelecimento"
        value={transaction.establishmentCode}
        span={5}
      />
      <Description
        label="Data e hora"
        value={transaction.formatted_registrationDate}
        span={5}
      />
      <Description
        label="Status da transação"
        value={transaction.situationTransaction.name}
        span={5}
      />
      <Description
        label="Tipo de transação"
        value={transaction.typeTransaction.name}
        span={5}
      />
      <Description label="Valor" value={transaction.formatted_value} span={4} />
    </Row>
  );
}

export default memo(ContentHeader);
