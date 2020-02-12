import { Collapse, Button, Typography, Divider } from 'antd';
import Header from './Content/Header';
import React, { useState, useCallback } from 'react';
import Content from './Content';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { fetchExtract } from 'App/Redux/modules/Extract/actions';
import ExtractHeader from './Header';

const { Panel } = Collapse;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
  paddingLeft: '16px',
};

export default function Extract() {
  const { transactions, transationTotal, isLoading } = useSelector(
    (state: IApplicationState) => state.extract
  );

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const updateData = useCallback(
    (page, rowsPerPage) => {
      dispatch(fetchExtract({ page, rowsPerPage }));
    },
    [dispatch]
  );

  const handleChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ): void => {
      setPage(newPage);
      updateData(newPage, rowsPerPage);
    },
    [setPage, updateData, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      const rowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(rowsPerPage);
      setPage(0);
      updateData(page, rowsPerPage);
    },
    [setPage, updateData, page]
  );

  return (
    <>
      <ExtractHeader />
      <Divider />
      <Collapse
        bordered={false}
        expandIconPosition="right"
        style={{ background: '#F0F2F5' }}
        expandIcon={({ isActive }) => (
          <Button type="primary">
            <Typography.Text type="secondary">Detalhes</Typography.Text>
          </Button>
        )}
      >
        {transactions.map((transaction, index) => (
          <Panel
            header={<Header transactions={transaction} key={index} />}
            key={index}
            style={customPanelStyle}
          >
            <Content transactions={transaction} key={index} />
          </Panel>
        ))}
      </Collapse>
    </>
  );
}
