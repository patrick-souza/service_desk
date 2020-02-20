import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { useFormik } from 'formik';
import { Tabs } from 'antd';
import * as Yup from 'yup';
import Modal from 'App/Components/Modal';
import { HideDialogCancelCard, PostCancelCard } from 'App/Redux/modules/Cancel';
import Historic from './Historic';
import FormCancelCard from './Form';

export default function CancelCard() {
  const { openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.cancelCard
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
      dispatch(PostCancelCard(reason, description));
    },
  });

  const handleChangeTab = (key: string) => {
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
        dispatch(HideDialogCancelCard());
      }}
    >
      <Tabs defaultActiveKey="cancel" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Cancelar Cartão" key={'cancel'}>
          <FormCancelCard formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de Cancelamento" key={'historic'}>
          <Historic />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
