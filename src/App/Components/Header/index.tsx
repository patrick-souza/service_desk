import React from 'react';
import { Row, Menu, Layout, Icon, Avatar, Typography, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import logoContaAqui from 'assets/logo-contaaqui.svg';

export default function Header() {
  const { name, email } = useSelector(
    (state: IApplicationState) => state.auth.user
  );
  return (
    <Layout.Header>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ height: '100%' }}
      >
        <img src={logoContaAqui} height={32} alt="logo conta aqui" />
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key={1}>Contatos</Menu.Item>
          <Menu.Item key={2}>Contas</Menu.Item>
          <Menu.SubMenu
            key={3}
            title={
              <Row type="flex" justify="center" align="middle">
                Atividades
                <Divider type="vertical" style={{ height: '0px' }} />
                <Icon type="down" />
              </Row>
            }
          >
            <Menu mode="vertical" theme="dark">
              <Menu.Item>Telefone</Menu.Item>
              <Menu.Item>E-mail</Menu.Item>
              <Menu.Item>Chat</Menu.Item>
              <Menu.Item>WhatsApp</Menu.Item>
            </Menu>
          </Menu.SubMenu>
          <Menu.Item key={4}>Tickets</Menu.Item>
        </Menu>
        <Row type="flex" justify="space-around" align="middle">
          <Avatar src={`https://api.adorable.io/avatar/${name}`} size="large" />
          <Divider type="vertical" style={{ height: '0px' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '20px',
              color: 'rgb(255, 255, 255)',
              justifyContent: 'space-between',
            }}
          >
            <Typography.Text type="secondary">{name}</Typography.Text>
            <Typography.Text type="secondary">{email}</Typography.Text>
          </div>
        </Row>
      </Row>
    </Layout.Header>
  );
}
