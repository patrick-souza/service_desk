import React, { memo } from 'react';
import { IApplicationState } from 'App/Redux/modules';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'App/Components/Modal';
import {
  hideDialogResendPassword,
  postResendPassword,
} from 'App/Redux/modules/Password';
import { Tabs } from 'antd';
import { sanitizeValue } from 'App/Util/format';
import FormResendPassword from './Form';
import Historic from './Historic';

function ResendPassword() {
  const { openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.historicResendPassword
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      to: '',
      recipient: '',
    },
    validationSchema: Yup.object().shape({
      to: Yup.string().required(),
      recipient: Yup.string().required(),
    }),
    onSubmit: ({ to, recipient }, cb) => {
      if (to === 'sms') {
        const sanitizedRecipient = sanitizeValue(recipient);
        dispatch(postResendPassword(to, sanitizedRecipient));
      } else dispatch(postResendPassword(to, recipient));

      cb.resetForm();
    },
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
        formik.resetForm();
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

export default memo(ResendPassword);
