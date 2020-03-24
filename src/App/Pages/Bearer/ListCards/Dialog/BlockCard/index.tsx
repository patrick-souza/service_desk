import React, { useState } from 'react';
import { Tabs, Typography } from 'antd';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import Yup from 'App/Util/Yup';
import { hideDialogBlockCard, PostBlockCard } from 'App/Redux/modules/Block';
import Modal from 'App/Components/Modal';
import FormBlockCard from './Form';
import Historic from './Historic';

export default function BlockCard() {
  const [activeKey, setActiveKey] = useState('block');

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
    onSubmit: ({ reason, description }, cb) => {
      dispatch(PostBlockCard(reason, description));
      cb.resetForm();
    },
  });

  const handleChangeTab = (key: string) => {
    setActiveKey(key);
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
      okId="bearer__dialog__block__save"
      cancelId="bearer__dialog__block__cancel"
      onCancel={() => {
        formik.resetForm();
        dispatch(hideDialogBlockCard());
      }}
    >
      <Tabs defaultActiveKey="block" onChange={handleChangeTab} type="card">
        <Tabs.TabPane
          tab={
            <Typography.Text
              id="dialog__block__block_card"
              strong={activeKey === 'block'}
            >
              Bloquear Cartão
            </Typography.Text>
          }
          key="block"
        >
          <FormBlockCard formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Typography.Text
              id="dialog__block__historic"
              strong={activeKey === 'historic'}
            >
              Histórico de bloqueio
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
