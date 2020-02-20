import React from 'react';
import { Row, Col, Button, Divider, Switch } from 'antd';
import CardActions from './CardActions';
import Description from 'App/Components/Description';
import LabelStatus from 'App/Components/LabelStatus';
import { Link } from 'react-router-dom';
import { updateCardCode } from 'App/Redux/modules/Extract';
import { useDispatch } from 'react-redux';
import { toggleContactless, ICard } from 'App/Redux/modules/Card';

export default function CardDetails({
  card_name,
  card_specifications,
  formatted_document,
  formatted_expiration_date,
  status,
  card_code,
  contactless,
  loadingContactless,
}: ICard & { loadingContactless: boolean }) {
  const dispatch = useDispatch();
  return (
    <>
      <Row>
        <Col span={18}>
          <Row type="flex" justify="space-between">
            <Col span={6}>
              <Description label="Nome cartão" value={card_name} />
              <Description
                label="Características"
                value={card_specifications ? card_specifications.summary : ''}
                extraAction={() => {
                  console.log('fetch caracteristicas');
                }}
              />
            </Col>
            <Col span={6}>
              <Description label="Documento" value={formatted_document} />
              <Description
                label="Contactless"
                value={
                  contactless ? (
                    <Switch
                      loading={loadingContactless}
                      size="small"
                      checked={contactless.status}
                      onChange={() => dispatch(toggleContactless(card_code))}
                    />
                  ) : (
                    '-'
                  )
                }
              />
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
            <Link to="/extract">
              <Button
                type="primary"
                size="large"
                onClick={(): void => {
                  dispatch(updateCardCode(card_code));
                }}
              >
                Ver Extrato
              </Button>
            </Link>
          </Row>
        </Col>
      </Row>
      <Divider style={{ margin: '12px 0' }} />
      <CardActions cardCode={card_code} />
    </>
  );
}
