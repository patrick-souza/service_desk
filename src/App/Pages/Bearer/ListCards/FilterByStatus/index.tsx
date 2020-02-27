import React, { memo } from 'react';
import { Row, Radio, Card, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { setActiveFilter } from 'App/Redux/modules/Card';

function FilterByStatus() {
  const {
    total,
    active,
    blocked,
    pre_block,
    canceled,
    activeFilter,
    isLoading,
  } = useSelector((state: IApplicationState) => state.card);
  const dispatch = useDispatch();
  return (
    <Card
      type="inner"
      size="small"
      style={{ width: '100%', margin: '8px 0px', maxHeight: '60px' }}
      loading={isLoading}
    >
      <Row type="flex" align="middle" justify="space-between">
        <Radio.Group
          defaultValue={activeFilter}
          buttonStyle="solid"
          onChange={e => dispatch(setActiveFilter(e.target.value))}
        >
          <Radio.Button value="T">Total - {total}</Radio.Button>
          <Radio.Button value="A">Ativos - {active}</Radio.Button>
          <Radio.Button value="C">Cancelados - {canceled}</Radio.Button>
          <Radio.Button value="P">Pré-Bloqueio - {pre_block}</Radio.Button>
          <Radio.Button value="B">Bloqueados - {blocked}</Radio.Button>
        </Radio.Group>
        <Typography.Text>
          <strong>Nº De Conta</strong> 1/10
        </Typography.Text>
      </Row>
    </Card>
  );
}

export default memo(FilterByStatus);
