import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { useFormik } from 'formik';
import { Tabs, Typography } from 'antd';
import Yup from 'App/Util/Yup';
import Modal from 'App/Components/Modal';
import { HideDialogCancelCard, PostCancelCard } from 'App/Redux/modules/Cancel';
import Historic from './Historic';
import FormCancelCard from './Form';

function CancelCard() {
  const { openDialog, isLoading } = useSelector(
    (state: IApplicationState) => state.cancelCard
  );

  const [activeKey, setActiveKey] = useState('cancel');

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
      dispatch(PostCancelCard(reason, description));
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
      onCancel={() => {
        formik.resetForm();
        dispatch(HideDialogCancelCard());
      }}
      okId="bearer__dialog__cancel__save"
      cancelId="bearer__dialog__cancel__cancel"
    >
      <Tabs defaultActiveKey="cancel" onChange={handleChangeTab} type="card">
        <Tabs.TabPane
          key="cancel"
          tab={
            <Typography.Text
              id="dialog__cancel__cancel_card"
              strong={activeKey === 'cancel'}
            >
              Cancelar Cartão
            </Typography.Text>
          }
        >
          <FormCancelCard formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Typography.Text
              id="dialog__cancel__cancel_historic"
              strong={activeKey === 'historic'}
            >
              Histórico de Cancelamento
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

export default memo(CancelCard);
