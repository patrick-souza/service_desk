import React from 'react';
import { Row, Col, Typography } from 'antd';
import contaAqui from 'assets/conta-aqui.png';
import homeWallpaper from 'assets/home-wallpaper.png';

import FormLogin from './Form';
import './index.css';

export default function Login() {
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col span={12} className="content">
        <div className="logo">
          <Row type="flex" justify="center">
            <img src={contaAqui} alt="conta aqui logo" />
          </Row>
          <Row type="flex" justify="center">
            <Typography.Text>
              <p>Seja bem-vindo! Por favor faça o login na sua conta.</p>
            </Typography.Text>
          </Row>
        </div>
        <FormLogin />
      </Col>
      <Col span={12} className="content">
        <img src={homeWallpaper} alt="" height="100%" />
      </Col>
    </Row>
  );
}
