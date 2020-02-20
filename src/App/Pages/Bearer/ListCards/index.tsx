import React, { useState, useCallback, useEffect } from 'react';
import { Row, Collapse } from 'antd';
import LabelbyStatus from './LabelbyStatus';
import FilterByStatus from './FilterByStatus';
import CardDetails from './CardDetails';
import Pagination from 'App/Components/Pagination';
import { fetchCards } from 'App/Redux/modules/Card';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import BlockCard from './Dialog/BlockCard';
import CancelCard from './Dialog/CancelCard';
import ResendPassword from './Dialog/ResendPassword';
import OrderDialog from './Dialog/Order';

import { stateDictionary } from 'App/Components/LabelStatus';
import CardHeader from './CardDetails/CardHeader';
import ReissueDialog from './Dialog/Reissue';
import CardHeaderSkeleton from './CardDetails/CardHeader/HeaderSkeleton';
import { fetchBearer } from 'App/Redux/modules/Bearer';

export default function ListCards() {
  const {
    count,
    cards,
    isLoading,
    loadingContactless,
    activeFilter,
  } = useSelector((state: IApplicationState) => state.card);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const updateData = useCallback(
    (page: number) => {
      dispatch(fetchCards({ page }));
      setCurrentPage(page);
    },
    [setCurrentPage, dispatch]
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  return (
    <>
      <Row type="flex">
        <LabelbyStatus />
      </Row>
      <Row type="flex">
        <FilterByStatus />
      </Row>
      <Row type="flex">
        <Collapse
          accordion
          bordered={false}
          expandIconPosition="right"
          onChange={(cardCode: string | string[]) => {
            if (Array.isArray(cardCode)) {
              console.log('isArray');
              return;
            }
            const card = cards.find(({ card_code }) => card_code === cardCode);

            if (card) {
              dispatch(fetchBearer(card.cardholder_id));
            }
          }}
          style={{ background: '#F0F2F5', width: '100%' }}
        >
          {isLoading
            ? [1, 2, 3].map(i => <CardHeaderSkeleton key={i} />)
            : cards.map(card => (
                <Collapse.Panel
                  style={{
                    borderLeft: `4px solid ${
                      stateDictionary[card.status].color
                    }`,
                    background: '#fff',
                    borderTop: '1px solid #ddd',
                    marginBottom: '16px',
                  }}
                  header={
                    <CardHeader
                      tier={card.tier}
                      truncate_number={card.truncate_number}
                      formatted_balance={card.formatted_balance}
                      image={card.image}
                    />
                  }
                  key={card.card_code}
                >
                  <CardDetails
                    {...card}
                    loadingContactless={loadingContactless === card.card_code}
                  />
                </Collapse.Panel>
              ))}
        </Collapse>
      </Row>
      <Row type="flex" justify="end" align="middle">
        <Pagination
          onChange={page => {
            updateData(page);
          }}
          defaultCurrent={1}
          current={currentPage}
          total={count}
        />
      </Row>
      <BlockCard />
      <CancelCard />
      <ResendPassword />
      <OrderDialog />
      <ReissueDialog />
    </>
  );
}
