import React from 'react';
import { Collapse, Button, Typography, Divider } from 'antd';
import Header from './Content/ContentHeader';
import Content from './Content';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import ExtractHeader from './Header';
export default function Extract() {
  const { transactions } = useSelector(
    (state: IApplicationState) => state.extract
  );

  return (
    <>
      <ExtractHeader />
      <Divider />
      <Collapse
        bordered={false}
        expandIconPosition="right"
        style={{ background: '#F0F2F5' }}
        expandIcon={() => (
          <Button type="primary">
            <Typography.Text type="secondary">Detalhes</Typography.Text>
          </Button>
        )}
      >
        {transactions.map((transaction, index) => (
          <Collapse.Panel
            header={<Header transactions={transaction} key={index} />}
            key={index}
            style={{
              background: '#fff',
              marginBottom: '16px',
              border: 0,
            }}
          >
            <Content transactions={transaction} key={index} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
}
