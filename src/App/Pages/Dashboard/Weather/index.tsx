import React, { useEffect, useState, useMemo } from 'react';
import { Row, Card, Col, Icon, Divider, Typography } from 'antd';
import { formatDate } from 'App/Util/format';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { fetchWeather } from 'App/Redux/modules/Weather';
import { fetchQuote } from 'App/Redux/modules/Quote';

export default function Weather() {
  const {
    icon,
    temp,
    author,
    quote,
    weahterLoading,
    quoteLoading,
  } = useSelector((state: IApplicationState) => {
    const { icon, temp, isLoading: weahterLoading } = state.weather;
    const { author, quote, isLoading: quoteLoading } = state.quote;

    return { icon, temp, author, quote, weahterLoading, quoteLoading };
  });
  const dispatch = useDispatch();

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const millisecondsPerSecond = 1000;
    let refInterval: NodeJS.Timeout;

    const timer = (): void => {
      refInterval = setInterval(() => {
        setNow(new Date());
      }, millisecondsPerSecond);
    };
    timer();
    return (): void => clearInterval(refInterval);
  }, []);

  const handleGreeting = useMemo(
    () =>
      now.getHours() < 12
        ? 'Bom Dia'
        : now.getHours() >= 12 && now.getHours() < 18
        ? 'Boa tarde'
        : 'Boa noite',
    [now]
  );
  useEffect(() => {
    dispatch(fetchWeather());
    dispatch(fetchQuote());
  }, [dispatch]);

  return (
    <Card
      style={{ backgroundColor: '#122a4e' }}
      loading={weahterLoading || quoteLoading}
    >
      <Row type="flex" align="middle" justify="space-around">
        <Row type="flex" align="middle" justify="center">
          <Col>
            <Typography.Text type="secondary">
              <Icon type="clock-circle" />
              {formatDate(now, 'HH:mm')}
            </Typography.Text>
          </Col>
        </Row>
        <Divider type="vertical" />
        <Row type="flex" align="middle" justify="center">
          <Col>
            <img src={icon} alt={icon} width={40} height={40} />
            <Typography.Text type="secondary">{temp} ºC</Typography.Text>
          </Col>
        </Row>
      </Row>
      <Divider type="horizontal" style={{ height: '0px' }} />
      <Row>
        <Typography.Title level={3} type="secondary">
          {handleGreeting}
        </Typography.Title>
      </Row>
      <Row>
        <Typography.Title level={3} type="secondary">
          {formatDate(now, 'LL')}
        </Typography.Title>
      </Row>
      <Divider type="horizontal" orientation="center" />
      <Typography.Text strong type="secondary">
        Frase do Dia
      </Typography.Text>
      <Divider type="horizontal" style={{ height: '0px' }} />
      <Typography.Paragraph
        type="secondary"
        ellipsis={{ rows: 4, expandable: true }}
        style={{ fontStyle: 'italic' }}
      >
        &quot; {quote} &quot;
      </Typography.Paragraph>
      <Typography.Text
        type="secondary"
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        {author}
      </Typography.Text>
    </Card>
  );
}
