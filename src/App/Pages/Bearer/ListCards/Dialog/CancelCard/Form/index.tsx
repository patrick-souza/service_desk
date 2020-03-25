import React, { memo } from 'react';
import { Form, Select, Input } from 'antd';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { ICancelCard } from 'App/Redux/modules/Cancel';

type IProps = {
  formik: FormikProps<ICancelCard>;
};
function FormCancelCard({ formik }: IProps) {
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
          id="form__cancel__select_reason"
          loading={isLoading}
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
          id="form__cancel__reason"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Descreva o motivo"
        />
      </Form.Item>
    </Form>
  );
}

export default memo(FormCancelCard);
