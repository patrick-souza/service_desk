import React, { useState } from 'react';
import { IApplicationState } from 'App/Redux/modules';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'App/Components/Modal';
import { hideDialogResendPassword } from 'App/Redux/modules/Password';
import { Tabs, Table, Form, Radio, Divider, Row, Icon, Input } from 'antd';

export default function ResendPassword() {
  const { historic, loadingHistoric, openDialog, email, phone } = useSelector(
    (state: IApplicationState) => {
      const {
        historic,
        historicLoading: loadingHistoric,
        openDialog,
      } = state.historicResendPassword;
      const { email, phone } = state.bearer.bearer;

      return { historic, loadingHistoric, openDialog, email, phone };
    }
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
      dataIndex: 'payload.situacao.situacao',
      key: 'payload.situacao.situacao',
    },
    {
      title: 'Data e Hora',
      dataIndex: 'formatted_createdAt',
      key: 'formatted_createdAt',
    },
  ];

  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  return (
    <Modal
      visible={openDialog}
      okText="Salvar"
      cancelText="Cancelar"
      onOk={() => {
        formik.submitForm();
      }}
      onCancel={() => {
        dispatch(hideDialogResendPassword());
      }}
    >
      <Tabs defaultActiveKey="resend" onChange={handleChangeTab} type="card">
        <Tabs.TabPane tab="Reenviar Senha" key={'resend'}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Item>
              <Radio.Group
                name="to"
                onChange={e => formik.setFieldValue('to', e.target.value)}
                value={formik.values.to}
              >
                <Row type="flex" align="middle">
                  <Radio value={1} style={{ display: 'flex' }}>
                    {email}
                    {editEmail && <Input placeholder="Email alternativo" />}
                  </Radio>
                  <Icon
                    type="edit"
                    onClick={() => {
                      setEditPhone(false);
                      setEditEmail(true);
                    }}
                  />
                </Row>
                <Divider style={{ height: 0 }} />
                <Row type="flex" align="middle">
                  <Radio value={2} style={{ display: 'flex' }}>
                    {phone}
                    {editPhone && (
                      <Input onChange={value => console.log(value)} />
                    )}
                  </Radio>
                  <Icon
                    type="edit"
                    onClick={() => {
                      setEditPhone(true);
                      setEditEmail(false);
                    }}
                  />
                </Row>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Histórico de Reenvio" key={'historic'}>
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
