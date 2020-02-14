import React from 'react';
import {
  Form,
  Row,
  Col,
  Select,
  Tooltip,
  Input,
  Typography,
  Divider,
} from 'antd';
import { FormikProps } from 'formik';
import { IReissueCard } from 'App/Redux/modules/Reissue';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';

type IProps = {
  formik: FormikProps<IReissueCard>;
};
export default function FormReissue({ formik }: IProps) {
  const { loadingReasons, reasons } = useSelector(
    (state: IApplicationState) => {
      const { isLoading: loadingReasons, reasons } = state.reason;

      return {
        loadingReasons,
        reasons,
      };
    }
  );
  return (
    <Form onSubmit={formik.handleSubmit} layout="vertical">
      <Row type="flex" gutter={16} justify="space-between" align="middle">
        <Col span={8}>
          <Form.Item
            label="Selecione o canal"
            validateStatus={
              !!formik.errors.channel && formik.touched.channel ? 'error' : ''
            }
            help={formik.errors.channel}
          >
            <Select
              style={{ width: '100%' }}
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
        </Col>
        <Col span={8}>
          <Form.Item
            label="Selecione o motivo"
            validateStatus={
              !!formik.errors.reason && formik.touched.reason ? 'error' : ''
            }
            help={formik.errors.reason}
          >
            <Select
              loading={loadingReasons}
              style={{ width: '100%' }}
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
                  <Tooltip placement="left" title={reason.nome}>
                    {reason.nome}
                  </Tooltip>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Número Truncado">
            <Input
              placeholder="9999*** *** 99999"
              disabled
              value={formik.values.truncated_number}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col span={24}>
          <Form.Item label="Portador">
            <Input
              value={formik.values.cardholder_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="cardholder_name"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Typography.Text strong>Endereço de Entrega</Typography.Text>
      </Row>
      <Divider style={{ margin: '12px 0', height: 0 }} />
      <Row type="flex" gutter={16} align="middle" justify="space-between">
        <Col span={9}>
          <Form.Item label={'Nome do destinatário'}>
            <Input
              value={formik.values.receiver}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="receiver"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={'CEP'}>
            <Input
              value={formik.values.address.zipcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="zipcode"
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label={'Endereço'}>
            <Input
              value={formik.values.address.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address.street"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row type="flex" gutter={16} justify="space-between" align="middle">
        <Col span={3}>
          <Form.Item label="Número">
            <Input
              value={formik.values.address.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address.number"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Complemento">
            <Input
              value={formik.values.address.complement}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address.complement"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Bairro">
            <Input
              value={formik.values.address.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address.district"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Cidade">
            <Input
              value={formik.values.address.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address.city"
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item label="Estado">
            <Input
              value={formik.values.address.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address.state"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
