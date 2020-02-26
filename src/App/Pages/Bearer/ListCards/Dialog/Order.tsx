import React, { memo } from 'react';
import Modal from 'App/Components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { HideDialogOrderCard } from 'App/Redux/modules/Orders';
import { Row, Icon, Typography, Col, Divider, Card, Skeleton } from 'antd';
import Description from 'App/Components/Description';

function OrderDialog() {
  const { order, openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.order
  );
  const dispatch = useDispatch();

  return (
    <Modal
      width={620}
      visible={openDialog}
      cancelText="Cancelar"
      onCancel={() => {
        dispatch(HideDialogOrderCard());
      }}
      title="Informações do Pedido"
    >
      <Skeleton avatar loading={isLoading}>
        <Row type="flex">
          <Description
            label="Status"
            value="Confira o status de rastreio abaixo"
          />
        </Row>
        <Row type="flex" align="middle">
          <Icon
            type="check-circle"
            theme="twoTone"
            twoToneColor="#52c41a"
            style={{ fontSize: 36, marginRight: 6 }}
          />
          <Typography.Text strong style={{ color: '#52c41a' }}>
            Pedido Entregue
          </Typography.Text>
        </Row>
        <Divider />
        <Row type="flex" justify="space-between">
          <Col span={10}>
            <Description
              label="Endereço de entrega"
              value={order.formatted_address}
            />
          </Col>
          <Col span={12}>
            <Description
              label="Acompanhe seu pedido:"
              value={order.tracking_link}
              extraAction={() => {
                window.open(order.tracking_link);
              }}
            />
          </Col>
        </Row>
        <Divider />
      </Skeleton>
      <Card
        loading={isLoading}
        bordered={false}
        style={{ background: '#f4f4f4' }}
      >
        <Row type="flex" justify="space-between">
          <Description
            span={8}
            label="Número do pedido"
            value={order.order_number}
          />
          <Description
            span={8}
            label="Data do Pedido"
            value={order.formatted_created_at}
          />
          <Description span={8} label="Item do cartão" value="" />
        </Row>
        <Divider />
        <Row type="flex" justify="space-between">
          <Description span={8} label="ID do cartão" value={order.card_code} />
          <Description
            span={8}
            label="Data de desbloqueio"
            value={order.formatted_unlocked_at}
          />
          <Description
            span={8}
            label="Canal de desbloqueio"
            value={order.unlock_channel}
          />
        </Row>
      </Card>
    </Modal>
  );
}

export default memo(OrderDialog);
