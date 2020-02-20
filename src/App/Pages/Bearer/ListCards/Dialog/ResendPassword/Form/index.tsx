import React, { useState } from 'react';
import { Form, Radio, Row, Input, Icon, Divider } from 'antd';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';

type IProps = {
  formik: FormikProps<{ to: string }>;
};
export default function FormResendPassword({ formik }: IProps) {
  const { email, phone } = useSelector(
    (state: IApplicationState) => state.bearer.bearer
  );

  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  return (
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
              {editPhone && <Input onChange={value => console.log(value)} />}
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
  );
}
