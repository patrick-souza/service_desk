import React from 'react';
import { Row } from 'antd';
import Description from 'App/Components/Description';
import { IExtract } from 'App/Redux/modules/Extract';

type IProps = {
  transactions: IExtract;
};

export default function ContentHeader(props: IProps) {
  return (
    <Row type="flex" align="middle" style={{ marginRight: '-20px' }}>
      {console.log(props.transactions)}
      <Description
        label="Estabelecimento"
        value={props.transactions.establishmentCode}
        span={5}
      />
      <Description
        label="Data e hora"
        value={props.transactions.formatted_registrationDate}
        span={5}
      />
      <Description
        label="Status da transação"
        value={props.transactions.situationTransaction.name}
        span={5}
      />
      <Description
        label="Tipo de transação"
        value={props.transactions.typeTransaction.name}
        span={5}
      />
      <Description
        label="Valor"
        value={props.transactions.formatted_value}
        span={4}
      />
    </Row>
  );
}
