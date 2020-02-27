import React, { memo } from 'react';
import { Form, Select, Input } from 'antd';
import { IBlockCard } from 'App/Redux/modules/Block';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';

type IProps = {
  formik: FormikProps<IBlockCard>;
};
function FormBlockCard({ formik }: IProps) {
  const { isLoading, reasons } = useSelector(
    (state: IApplicationState) => state.reason
  );

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Item
        validateStatus={
          !!formik.errors.reason && formik.touched.reason ? 'error' : ''
        }
        help={formik.errors.reason}
      >
        <Select
          loading={isLoading}
          style={{ width: '100%' }}
          placeholder="Selecione o motivo"
          onChange={(value: string) => {
            formik.setFieldValue('reason', value);
          }}
          id="bearer__dialog__reason__block"
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
          id="bearer__dialog__description__block"
        />
      </Form.Item>
    </Form>
  );
}

export default memo(FormBlockCard);
