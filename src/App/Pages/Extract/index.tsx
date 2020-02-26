import React, { useState, useCallback, useEffect, memo } from 'react';
import {
  Collapse,
  Button,
  Typography,
  Divider,
  Pagination,
  Row,
  Empty,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { fetchExtract } from 'App/Redux/modules/Extract';
import Header from './Content/ContentHeader';
import Content from './Content';
import ExtractHeader from './Header';
import ContentHeaderSkeleton from './Content/ContentHeader/Skeleton';

function Extract() {
  const {
    transactions,
    isLoading,
    transationTotal,
    filter,
    formatted_balance,
  } = useSelector((state: IApplicationState) => {
    const card = state.card.cards.find(
      ({ card_code }) => card_code === state.extract.cardCode
    );

    return {
      ...state.extract,
      formatted_balance: card ? card.formatted_balance : 'R$ 0,00',
    };
  });
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const updateData = useCallback(
    (page: number) => {
      dispatch(fetchExtract({ page }));
      setCurrentPage(page);
    },
    [setCurrentPage, dispatch]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  return (
    <>
      <ExtractHeader balance={formatted_balance} />
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
        {isLoading
          ? [1, 2, 3, 4, 5].map(i => <ContentHeaderSkeleton key={i} />)
          : transactions.map(transaction => (
              // eslint-disable-next-line react/jsx-indent
              <Collapse.Panel
                header={<Header transaction={transaction} />}
                key={transaction.trasactionCode}
                style={{
                  background: '#fff',
                  marginBottom: '16px',
                  border: 0,
                }}
              >
                <Content transaction={transaction} />
              </Collapse.Panel>
            ))}
      </Collapse>
      {!isLoading && transactions.length === 0 && (
        <Empty
          style={{ flex: 1 }}
          description="Não encontramos nenhuma transação"
        />
      )}
      <Row type="flex" justify="end" align="middle">
        <Pagination
          onChange={page => {
            updateData(page);
          }}
          defaultPageSize={5}
          defaultCurrent={1}
          current={currentPage}
          total={transationTotal}
        />
      </Row>
    </>
  );
}

export default memo(Extract);
