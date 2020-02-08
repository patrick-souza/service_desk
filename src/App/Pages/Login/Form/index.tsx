import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css';

export default function NormalLoginForm() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required()
        .email(),
      password: Yup.string().required(),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      layout="vertical"
      className="form"
    >
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Insira seu login de rede"
          value={formik.values.username}
          onChange={formik.handleChange}
          name="username"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Insira sua senha"
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Entrar
      </Button>
    </Form>
  );
}
