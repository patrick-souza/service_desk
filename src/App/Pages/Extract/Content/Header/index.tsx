import React from 'react';
import { Row, Col } from 'antd';
import Description from 'App/Components/Description';
import './index.css';
import { IExtract } from 'App/Redux/modules/Extract';

type IProps = {
  transactions: IExtract;
};

export default function Header(props: IProps) {
  return (
    <Row type="flex" align="middle">
      {console.log(props.transactions)}
      <Description
        label="Estabelecimento"
        value={props.transactions.establishmentCode}
        span={3}
      />
      <Description
        label="Data e hora"
        value={props.transactions.formatted_registrationDate}
        span={3}
      />
      <Description
        label="Status da transação"
        value={props.transactions.situationTransaction.name}
        span={3}
      />
      <Description
        label="Tipo de transação"
        value={props.transactions.typeTransaction.name}
        span={3}
      />
      <Description
        label="Valor"
        value={props.transactions.formatted_value}
        span={3}
      />
      <Col span={3} />
    </Row>
  );
}
