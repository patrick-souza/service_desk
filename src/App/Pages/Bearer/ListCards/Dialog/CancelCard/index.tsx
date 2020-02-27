import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { useFormik } from 'formik';
import { Tabs } from 'antd';
import Yup from 'App/Util/Yup';
import Modal from 'App/Components/Modal';
import { HideDialogCancelCard, PostCancelCard } from 'App/Redux/modules/Cancel';
import Historic from './Historic';
import FormCancelCard from './Form';

function CancelCard() {
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
    onSubmit: ({ reason, description }, cb) => {
      dispatch(PostCancelCard(reason, description));
      cb.resetForm();
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
        formik.resetForm();
        dispatch(HideDialogCancelCard());
      }}
      okId="bearer__dialog__cancel__save"
      cancelId="bearer__dialog__cancel__cancel"
    >
      <Tabs defaultActiveKey="cancel" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Cancelar Cartão" key="cancel">
          <FormCancelCard formik={formik} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de Cancelamento" key="historic">
          <Historic />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default memo(CancelCard);
