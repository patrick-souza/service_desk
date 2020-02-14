import React from 'react';
import { Tabs } from 'antd';
import { useFormik } from 'formik';
import Modal from 'App/Components/Modal';
import { IApplicationState } from 'App/Redux/modules';
import { useSelector, useDispatch } from 'react-redux';
import {
  hideDialogReissueCard,
  postReissueCard,
} from 'App/Redux/modules/Reissue';
import FormReissue from './Form';

export default function ReissueDialog() {
  const {
    openDialog,
    truncate_number,
    zip_code,
    loadingReissue,
    portador,
  } = useSelector((state: IApplicationState) => {
    const {
      isLoading: loadingReissue,
      openDialog,
      cardCode: cardCode,
    } = state.reissue;
    const card = state.card.cards.find(card => card.card_code === cardCode);

    const { zip_code, name: portador } = state.bearer.bearer;
    let truncate_number = '';
    if (card && card.truncate_number) truncate_number = card.truncate_number;

    return {
      loadingReissue,
      openDialog,
      truncate_number,
      zip_code,
      portador,
    };
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channel: '',
      reason: '',
      card_id: 0,
      truncated_number: truncate_number,
      cardholder_name: portador,
      receiver: '',
      address: {
        street: '',
        number: '',
        complement: '',
        district: '',
        zipcode: zip_code,
        city: '',
        state: '',
      },
    },
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(postReissueCard(values));
    },
  });
  const handleChangeTab = (key: string) => {
    formik.resetForm();
  };

  return (
    <Modal
      width={720}
      visible={openDialog}
      okText="Salvar"
      cancelText="Cancelar"
      loading={loadingReissue}
      onOk={() => {
        formik.submitForm();
      }}
      onCancel={() => {
        dispatch(hideDialogReissueCard());
      }}
    >
      <Tabs defaultActiveKey="block" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Reimissão de cartão" key={'reissue'}>
          <FormReissue formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Histórico de reemissão"
          key={'historic'}
        ></Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
