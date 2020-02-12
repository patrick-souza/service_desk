import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { useFormik } from 'formik';
import { Tabs, Form, Select, Input, Table } from 'antd';
import * as Yup from 'yup';
import Modal from 'App/Components/Modal';
import { HideDialogCancelCard, PostCancelCard } from 'App/Redux/modules/Cancel';

export default function CancelCard() {
  const {
    loadingReasons,
    reasons,
    historic,
    loadingHistoric,
    openDialog,
  } = useSelector((state: IApplicationState) => {
    const { isLoading: loadingReasons, reasons } = state.reason;
    const {
      historic,
      historicLoading: loadingHistoric,
      openDialog,
    } = state.cancelCard;

    return { loadingReasons, reasons, historic, loadingHistoric, openDialog };
  });

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

  const columns = [
    {
      title: 'Responsável',
      dataIndex: 'user',
      key: '_id',
    },
    {
      title: 'Motivo',
      dataIndex: 'payload.situacao.nome',
      key: 'payload.situacao.nome',
    },
    {
      title: 'Data e Hora',
      dataIndex: 'formatted_createdAt',
      key: 'formatted_createdAt',
    },
  ];
  return (
    <Modal
      width={620}
      visible={openDialog}
      okText="Salvar"
      cancelText="Cancelar"
      onOk={() => {
        formik.submitForm();
      }}
      onCancel={() => {
        dispatch(HideDialogCancelCard());
      }}
    >
      <Tabs defaultActiveKey="cancel" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Cancelar Cartão" key={'cancel'}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Item
              validateStatus={
                !!formik.errors.reason && formik.touched.reason ? 'error' : ''
              }
              help={formik.errors.reason}
            >
              <Select
                loading={loadingReasons}
                style={{ width: '100%' }}
                placeholder="Selecione o motivo"
                onChange={(value: string) => {
                  formik.setFieldValue('reason', value);
                }}
                onBlur={() => formik.setFieldTouched('reason')}
              >
                {reasons.map(reason => (
                  <Select.Option
                    key={reason.codigoSituacao}
                    value={reason.codigoSituacao}
                  >
                    {reason.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              validateStatus={
                !!formik.errors.description && formik.touched.description
                  ? 'error'
                  : ''
              }
              help={formik.errors.description}
            >
              <Input.TextArea
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Descreva o motivo"
              />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de Cancelamento" key={'historic'}>
          <Table
            loading={loadingHistoric}
            dataSource={historic}
            rowKey={row => row._id}
            columns={columns}
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
