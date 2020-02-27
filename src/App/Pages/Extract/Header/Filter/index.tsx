import React, { useState, memo } from 'react';
import { Col, Card, Row, Radio, Typography, Divider, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import {
  updateFilterExtract,
  resetFilterExtract,
} from 'App/Redux/modules/Extract';

function Filter() {
  const [activeFilter, setActiveFilter] = useState(null);

  const dispatch = useDispatch();

  const handleFilter = (dates: RangePickerValue) => {
    const [start_date, end_date] = dates;

    if (start_date && end_date)
      dispatch(updateFilterExtract([start_date, end_date]));
    else dispatch(resetFilterExtract());
  };

  const handleRadioFilter = (days: number) =>
    handleFilter([moment().subtract(days, 'days'), moment()]);

  return (
    <Col span={12}>
      <Card size="small" bordered={false}>
        <Row type="flex" justify="space-between">
          <Radio.Group
            buttonStyle="solid"
            onChange={e => {
              handleRadioFilter(e.target.value);

              setActiveFilter(e.target.value);
            }}
            value={activeFilter}
          >
            <Radio.Button value={0} id="extract__header__today">
              Hoje
            </Radio.Button>
            <Radio.Button value={30} id="extract__header__30">
              30 dias
            </Radio.Button>
            <Radio.Button value={60} id="extract__header__60">
              60 dias
            </Radio.Button>
            <Radio.Button value={90} id="extract__header__90">
              90 dias
            </Radio.Button>
          </Radio.Group>
          <div>
            <Typography.Text strong>Por data:</Typography.Text>
            <Divider type="vertical" style={{ height: 0 }} />
            <DatePicker.RangePicker
              onChange={dates => {
                handleFilter(dates);
                setActiveFilter(null);
              }}
            />
          </div>
        </Row>
      </Card>
    </Col>
  );
}

export default memo(Filter);
