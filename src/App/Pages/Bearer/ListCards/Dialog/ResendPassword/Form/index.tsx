import React, { useState, memo } from 'react';
import { Form, Radio, Divider } from 'antd';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import Yup from 'App/Util/Yup';
import CustomOption from './CustomRadio';

type IProps = {
  formik: FormikProps<{ to: string; recipient: string }>;
};
function FormResendPassword({ formik }: IProps) {
  const { email, formatted_phone } = useSelector(
    (state: IApplicationState) => state.bearer.bearer
  );
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(formatted_phone);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Item>
        <Radio.Group
          style={{ width: '100%' }}
          name="to"
          onChange={e => {
            formik.setFieldValue('to', e.target.value);
            formik.setFieldValue(
              'recipient',
              e.target.value === 'email' ? email : formatted_phone
            );
          }}
          value={formik.values.to}
        >
          <CustomOption
            value={localEmail}
            onSelect={e => {
              setLocalEmail(e.email || email);
              formik.setFieldValue('to', 'email');
              formik.setFieldValue('recipient', e.email || email);
            }}
            type="email"
            validation={Yup.string()
              .required()
              .email()}
          />
          <Divider style={{ height: 0 }} />
          <CustomOption
            value={localPhone}
            onSelect={e => {
              setLocalPhone(e.sms || formatted_phone);
              formik.setFieldValue('to', 'sms');
              formik.setFieldValue('recipient', e.sms || formatted_phone);
            }}
            type="sms"
            validation={Yup.string()
              .required()
              .matches(
                new RegExp(
                  /(\([1-9][0-9]\))\s?([6-9]{1})?([0-9]{4})-?([0-9]{4})$/
                ),
                'Número de telefone inválido'
              )}
            mask="(99) 99999-9999"
          />
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}

export default memo(FormResendPassword);
