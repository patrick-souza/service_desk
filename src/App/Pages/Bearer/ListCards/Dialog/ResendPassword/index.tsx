import React, { memo, useState } from 'react';
import { IApplicationState } from 'App/Redux/modules';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Yup from 'App/Util/Yup';
import Modal from 'App/Components/Modal';
import {
  hideDialogResendPassword,
  postResendPassword,
} from 'App/Redux/modules/Password';
import { Tabs, Typography } from 'antd';
import { sanitizeValue } from 'App/Util/format';
import FormResendPassword from './Form';
import Historic from './Historic';

function ResendPassword() {
  const { openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.historicResendPassword
  );

  const [activeKey, setActiveKey] = useState('resend');

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

  const handleChangeTab = (key: string) => {
    setActiveKey(key);
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
      okId="bearer__dialog__password__save"
      cancelId="bearer__dialog__password__cancel"
      onCancel={() => {
        formik.resetForm();
        dispatch(hideDialogResendPassword());
      }}
    >
      <Tabs defaultActiveKey="resend" onChange={handleChangeTab} type="card">
        <Tabs.TabPane
          tab={
            <Typography.Text
              id="dialog__password__resend_password"
              strong={activeKey === 'resend'}
            >
              Reenviar Senha
            </Typography.Text>
          }
          key="resend"
        >
          <FormResendPassword formik={formik} />
          {(formik.errors.recipient || formik.errors.to) && (
            <Typography.Text type="danger">
              Destinatário é um campo obrigatório
            </Typography.Text>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Typography.Text
              id="dialog_password_historic"
              strong={activeKey === 'historic'}
            >
              Histórico de Reenvio
            </Typography.Text>
          }
          key="historic"
        >
          <Historic />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default memo(ResendPassword);
