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
import * as Yup from 'yup';
import FormReissue from './Form';
import Historic from './Historic';

export default function ReissueDialog() {
  const {
    openDialog,
    truncate_number,
    zip_code,
    isLoading,
    portador,
  } = useSelector((state: IApplicationState) => {
    const card = state.card.cards.find(
      ({ card_code }) => card_code === state.reissue.cardCode
    );

    return {
      isLoading: state.reissue.isLoading,
      openDialog: state.reissue.openDialog,
      truncate_number: card && card.truncate_number ? card.truncate_number : '',
      zip_code: state.bearer.bearer.zip_code,
      portador: state.bearer.bearer.name,
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
    validationSchema: Yup.object().shape({
      channel: Yup.string().required(),
      reason: Yup.string().required(),
      card_id: Yup.number().required(),
      truncated_number: Yup.string().required(),
      cardholder_name: Yup.string().required(),
      receiver: Yup.string().required(),
      address: Yup.object().shape({
        street: Yup.string().required(),
        number: Yup.number().required(),
        complement: Yup.string().required(),
        district: Yup.string().required(),
        zipcode: Yup.string()
          .required()
          .max(9),
        city: Yup.string().required(),
        state: Yup.string().required(),
      }),
    }),
    enableReinitialize: true,
    onSubmit: (values, cb) => {
      dispatch(postReissueCard(values));
      cb.resetForm();
    },
  });

  const handleChangeTab = () => {
    formik.resetForm();
  };

  return (
    <Modal
      width={720}
      visible={openDialog}
      okText="Salvar"
      cancelText="Cancelar"
      loading={isLoading}
      onOk={() => {
        formik.submitForm();
      }}
      onCancel={() => {
        formik.resetForm();
        dispatch(hideDialogReissueCard());
      }}
    >
      <Tabs defaultActiveKey="block" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Reimissão de cartão" key="reissue">
          <FormReissue formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de reemissão" key="historic">
          <Historic />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
