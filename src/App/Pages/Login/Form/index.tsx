import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css';
import history from '../../../util/history';

export default function NormalLoginForm() {
  const [isLoading, setLoading] = useState(false);
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
      setLoading(true);
      setTimeout(() => {
        history.push('dashboard');
      }, 3000);
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
      <Form.Item
        validateStatus={
          !!formik.errors.username && formik.touched.username ? 'error' : ''
        }
        help={formik.errors.username}
      >
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Insira seu login de rede"
          value={formik.values.username}
          onChange={formik.handleChange}
          name="username"
          disabled={isLoading}
        />
      </Form.Item>
      <Form.Item
        validateStatus={
          !!formik.errors.password && formik.touched.password ? 'error' : ''
        }
        help={formik.errors.password}
      >
        <Input.Password
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Insira sua senha"
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          disabled={isLoading}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Entrar
      </Button>
    </Form>
  );
}
