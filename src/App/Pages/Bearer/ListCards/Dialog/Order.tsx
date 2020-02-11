import React from 'react';
import Modal from 'App/Components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { HideDialogOrderCard } from 'App/Redux/modules/Orders';

export default function OrderDialog() {
  const { order, openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.order
  );
  const dispatch = useDispatch();

  return (
    <Modal
      visible={openDialog}
      cancelText="Cancelar"
      onCancel={() => {
        dispatch(HideDialogOrderCard());
      }}
      title="Informações do Pedido"
    ></Modal>
  );
}
