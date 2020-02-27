import React, { useState, useCallback, useEffect, memo } from 'react';
import { Row, Collapse, Empty, Col } from 'antd';
import Pagination from 'App/Components/Pagination';
import { fetchCards } from 'App/Redux/modules/Card';
import Scrollbar from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { stateDictionary } from 'App/Components/LabelStatus';
import { fetchBearer } from 'App/Redux/modules/Bearer';
import LabelbyStatus from './LabelbyStatus';
import FilterByStatus from './FilterByStatus';
import CardDetails from './CardDetails';
import BlockCard from './Dialog/BlockCard';
import CancelCard from './Dialog/CancelCard';
import ResendPassword from './Dialog/ResendPassword';
import OrderDialog from './Dialog/Order';
import CharacteristicsDialog from './Dialog/Characteristic';
import CardHeader from './CardDetails/CardHeader';
import ReissueDialog from './Dialog/Reissue';
import CardHeaderSkeleton from './CardDetails/CardHeader/HeaderSkeleton';

function ListCards() {
  const { count, cards, isLoading, activeFilter } = useSelector(
    (state: IApplicationState) => state.card
  );
  const { loadingContactless } = useSelector(
    (state: IApplicationState) => state.card
  );
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
      <Row
        type="flex"
        style={{ flexDirection: 'column', height: '118%', flex: 1 }}
      >
        <Col span={24} style={{ height: '100%', flex: 1 }}>
          <Scrollbar style={{ height: '100%', flex: 1 }}>
            <Collapse
              accordion
              bordered={false}
              expandIconPosition="right"
              onChange={(cardCode: string | string[]) => {
                if (Array.isArray(cardCode)) {
                  return;
                }
                const card = cards.find(
                  ({ card_code }) => card_code === cardCode
                );

                if (card) {
                  dispatch(fetchBearer(card.cardholder_id));
                }
              }}
              style={{ background: '#F0F2F5', width: '100%' }}
            >
              {isLoading
                ? [1, 2, 3].map(i => <CardHeaderSkeleton key={i} />)
                : cards.map(card => (
                    // eslint-disable-next-line react/jsx-indent
                    <Collapse.Panel
                      style={{
                        borderLeft: `4px solid ${
                          stateDictionary[card.status].color
                        }`,
                        background: '#fff',
                        borderTop: '1px solid #ddd',
                        marginBottom: '16px',
                      }}
                      header={<CardHeader {...card} />}
                      key={card.card_code}
                    >
                      <CardDetails
                        {...card}
                        loadingContactless={
                          loadingContactless === card.card_code
                        }
                      />
                    </Collapse.Panel>
                  ))}
            </Collapse>
            {!isLoading && cards.length === 0 && (
              <Empty
                style={{ flex: 1 }}
                description="Não encontramos nenhum cartão"
              />
            )}
          </Scrollbar>
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
        </Col>
      </Row>
      <BlockCard />
      <CancelCard />
      <ResendPassword />
      <OrderDialog />
      <CharacteristicsDialog />
      <ReissueDialog />
    </>
  );
}

export default memo(ListCards);
