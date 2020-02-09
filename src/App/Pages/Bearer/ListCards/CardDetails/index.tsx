import React from 'react';
import { Collapse, Row, Col, Button, Divider } from 'antd';
import './index.css';
import CardActions from './CardActions';

import Description from 'App/Components/Description';
import LabelStatus from 'App/Components/LabelStatus';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import CardHeader from './CardHeader';

export default function CardDetails() {
  const { cards, isLoading } = useSelector(
    (state: IApplicationState) => state.card
  );

  return (
    <Collapse
      accordion
      bordered={false}
      defaultActiveKey={['1']}
      expandIconPosition="right"
      style={{ background: '#fff', width: '100%' }}
    >
      {cards.map(
        ({
          tier,
          truncate_number,
          formatted_balance,
          image,
          card_code,
          card_name,
          card_specifications,
          formatted_document,
          formatted_expiration_date,
          status,
        }) => (
          <Collapse.Panel
            style={{ borderLeft: '4px solid #dda900' }}
            header={
              <CardHeader
                loading={isLoading}
                tier={tier}
                truncate_number={truncate_number}
                formatted_balance={formatted_balance}
                image={image}
              />
            }
            key={card_code}
          >
            <Row>
              <Col span={18}>
                <Row type="flex" justify="space-between">
                  <Col span={6}>
                    <Description label="Nome cartão" value={card_name} />
                    <Description
                      label="Características"
                      value={card_specifications.summary}
                      extraAction={() => {
                        console.log('fetch caracteristicas');
                      }}
                    />
                  </Col>
                  <Col span={6}>
                    <Description label="Documento" value={formatted_document} />
                    <Description label="Aviso Viagem" value="" />
                  </Col>
                  <Col span={6}>
                    <Description
                      label="Data Expiração"
                      value={formatted_expiration_date}
                    />
                    <Description
                      label="Status"
                      value={<LabelStatus state={status} />}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{ height: '100px' }}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      console.log(card_code);
                    }}
                  >
                    Ver Extrato
                  </Button>
                </Row>
              </Col>
            </Row>
            <Divider style={{ margin: '12px 0' }} />
            <CardActions cardCode={1} />
          </Collapse.Panel>
        )
      )}
    </Collapse>
  );
}
