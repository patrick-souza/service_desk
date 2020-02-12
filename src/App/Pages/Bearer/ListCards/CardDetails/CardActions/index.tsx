import React from 'react';
import { Row, Button, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { showDialogBlockCard } from 'App/Redux/modules/Block';
import { ShowDialogCancelCard } from 'App/Redux/modules/Cancel';
import { showDialogResendPassword } from 'App/Redux/modules/Password';
import { ShowDialogOrderCard } from 'App/Redux/modules/Orders';
import { showDialogReissueCard } from 'App/Redux/modules/Reissue';

type IProps = {
  cardCode: number;
};
export default function CardActions({ cardCode }: IProps) {
  const dispatch = useDispatch();

  return (
    <Row type="flex">
      <Button
        size="large"
        onClick={() => {
          dispatch(showDialogResendPassword(cardCode));
        }}
      >
        Senhas
      </Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button
        size="large"
        onClick={() => {
          dispatch(showDialogReissueCard(cardCode));
        }}
      >
        Reemitir
      </Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button
        size="large"
        onClick={() => {
          dispatch(ShowDialogCancelCard(cardCode));
        }}
      >
        Cancelar
      </Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button
        size="large"
        onClick={() => {
          dispatch(showDialogBlockCard(cardCode));
        }}
      >
        Bloquear
      </Button>
      <Divider type="vertical" style={{ height: 0 }} />

      <Button
        size="large"
        onClick={() => {
          dispatch(ShowDialogOrderCard(cardCode));
        }}
      >
        Pedidos
      </Button>
      <Divider type="vertical" style={{ height: 0 }} />
    </Row>
  );
}
