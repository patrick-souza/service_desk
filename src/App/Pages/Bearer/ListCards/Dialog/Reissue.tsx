import React from 'react';
import { Tabs, Form, Select, Input } from 'antd';
import { useFormik } from 'formik';
import Modal from 'App/Components/Modal';
import { IApplicationState } from 'App/Redux/modules';
import { useSelector, useDispatch } from 'react-redux';
import { hideDialogReissueCard } from 'App/Redux/modules/Reissue';

export default function ReissueDialog() {
  const { loadingReasons, reasons, loadingReissue, openDialog } = useSelector(
    (state: IApplicationState) => {
      const { isLoading: loadingReasons, reasons } = state.reason;
      const { isLoading: loadingReissue, openDialog } = state.reissue;

      return { loadingReasons, reasons, loadingReissue, openDialog };
    }
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channel: '',
      reason: '',
      card_id: 0,
      truncated_number: '',
      cardholder_name: '',
      receiver: '',
      address: {
        street: '',
        number: '',
        complement: '',
        district: '',
        zipcode: '',
        city: '',
        state: '',
      },
    },
    onSubmit: value => {
      console.log(value);
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
      onOk={() => {
        formik.submitForm();
      }}
      onCancel={() => {
        dispatch(hideDialogReissueCard());
      }}
    >
      <Tabs defaultActiveKey="block" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Reimissão de cartão" key={'reissue'}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Item
              validateStatus={
                !!formik.errors.channel && formik.touched.channel ? 'error' : ''
              }
              help={formik.errors.channel}
            >
              <Select
                loading={loadingReasons}
                style={{ width: '100%' }}
                placeholder="Selecione o canal"
                onChange={(value: string) => {
                  formik.setFieldValue('reason', value);
                }}
                onBlur={() => formik.setFieldTouched('reason')}
              >
                {[
                  { value: 'email', label: 'E-mail' },
                  { value: 'chat', label: 'Chat' },
                  { value: 'telefone', label: 'Telefone' },
                  { value: 'WhatsApp', label: 'WhatsApp' },
                ].map(channel => (
                  <Select.Option key={channel.value} value={channel.value}>
                    {channel.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

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
            <Form.Item>
              <Input placeholder="Número Truncado" disabled />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de reemissão" key={'historic'}>
          {/* <Table
            loading={loadingHistoric}
            dataSource={historic}
            rowKey={row => row._id}
            columns={columns}
          /> */}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
