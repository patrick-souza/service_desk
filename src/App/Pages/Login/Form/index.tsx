import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { useFormik } from 'formik';
import Yup from 'App/Util/Yup';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth } from 'App/Redux/modules/Auth';
import { IApplicationState } from 'App/Redux/modules';

export default function NormalLoginForm() {
  const dispatch = useDispatch();

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
    onSubmit: ({ username, password }) => {
      dispatch(fetchAuth(username, password));
    },
  });
  const { isLoading } = useSelector((state: IApplicationState) => state.auth);

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
          id="login__username"
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
          id="login__password"
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={isLoading}
        id="login__signin"
      >
        Entrar
      </Button>
    </Form>
  );
}
