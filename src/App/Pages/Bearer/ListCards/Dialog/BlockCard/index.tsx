import React from 'react';
import { Tabs } from 'antd';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import * as Yup from 'yup';
import { hideDialogBlockCard, PostBlockCard } from 'App/Redux/modules/Block';
import Modal from 'App/Components/Modal';
import FormBlockCard from './Form';
import Historic from './Historic';

export default function BlockCard() {
  const { openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.blockCard
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      reason: 0,
      description: '',
    },
    validationSchema: Yup.object().shape({
      reason: Yup.string().required(),
      description: Yup.string().required(),
    }),
    onSubmit: ({ reason, description }) => {
      dispatch(PostBlockCard(reason, description));
    },
  });

  const handleChangeTab = () => {
    formik.resetForm();
  };

  return (
    <Modal
      width={620}
      visible={openDialog}
      okText="Salvar"
      cancelText="Cancelar"
      loading={isLoading}
      onOk={() => {
        formik.submitForm();
      }}
      onCancel={() => {
        dispatch(hideDialogBlockCard());
      }}
    >
      <Tabs defaultActiveKey="block" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Bloquear Cartão" key={'block'}>
          <FormBlockCard formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de bloqueio" key={'historic'}>
          <Historic />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
