import React, { useEffect, useState, useCallback } from 'react';
import { Row } from 'antd';
import LabelbyStatus from './LabelbyStatus';
import FilterByStatus from './FilterByStatus';
import CardDetails from './CardDetails';
import Pagination from 'App/Components/Pagination';
import CardContext from './CardContext';
import { IStatusCard, fetchCards } from 'App/Redux/modules/Card';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import BlockCard from './Dialog/BlockCard';
import CancelCard from './Dialog/CancelCard';
import ResendPassword from './Dialog/ResendPassword';

export default function ListCards() {
  const { count } = useSelector((state: IApplicationState) => state.card);
  const [activeFilter, setActiveFilter] = useState<IStatusCard>('T');
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const updateData = useCallback(
    (page: number, rowsPerPage: number, state: IStatusCard) => {
      dispatch(fetchCards({ page, rowsPerPage, state }));
      setCurrentPage(page);
    },
    [setCurrentPage, dispatch]
  );

  useEffect(() => {
    updateData(1, 5, activeFilter);
    setCurrentPage(1);
  }, [activeFilter, updateData]);

  return (
    <CardContext.Provider
      value={{ filter: activeFilter, setFilter: setActiveFilter }}
    >
      <Row type="flex">
        <LabelbyStatus />
      </Row>
      <Row type="flex">
        <FilterByStatus />
      </Row>
      <Row type="flex">
        <CardDetails />
      </Row>
      <Row type="flex" justify="end" align="middle">
        <Pagination
          onShowSizeChange={(current, size) => {
            updateData(current, size, activeFilter);
          }}
          onChange={(page, pageSize) => {
            updateData(page, pageSize || 5, activeFilter);
          }}
          defaultCurrent={1}
          current={currentPage}
          total={count}
        />
      </Row>
      <BlockCard />
      <CancelCard />
      <ResendPassword />
    </CardContext.Provider>
  );
}
