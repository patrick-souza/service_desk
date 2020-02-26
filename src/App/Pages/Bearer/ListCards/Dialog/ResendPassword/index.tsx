import React from 'react';
import { IApplicationState } from 'App/Redux/modules';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'App/Components/Modal';
import { hideDialogResendPassword } from 'App/Redux/modules/Password';
import { Tabs } from 'antd';
import FormResendPassword from './Form';
import Historic from './Historic';

export default function ResendPassword() {
  const { openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.historicResendPassword
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      to: '',
    },
    validationSchema: Yup.object().shape({
      to: Yup.string().required(),
    }),
    onSubmit: values => console.log(values),
  });

  const handleChangeTab = () => {
    formik.resetForm();
  };

  return (
    <Modal
      visible={openDialog}
      okText="Salvar"
      cancelText="Cancelar"
      loading={isLoading}
      onOk={() => {
        formik.submitForm();
      }}
      onCancel={() => {
        dispatch(hideDialogResendPassword());
      }}
    >
      <Tabs defaultActiveKey="resend" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Reenviar Senha" key="resend">
          <FormResendPassword formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de Reenvio" key="historic">
          <Historic />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
