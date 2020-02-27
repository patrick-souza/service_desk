import React, { useEffect, useState, useMemo, memo } from 'react';
import { Row, Card, Icon, Divider, Typography } from 'antd';
import { formatDate } from 'App/Util/format';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import { fetchWeather } from 'App/Redux/modules/Weather';
import { fetchQuote } from 'App/Redux/modules/Quote';

function Weather() {
  const {
    icon,
    temp,
    author,
    quote,
    weahterLoading,
    quoteLoading,
  } = useSelector((state: IApplicationState) => {
    return {
      icon: state.weather.icon,
      temp: state.weather.temp,
      author: state.quote.author,
      quote: state.quote.quote,
      weahterLoading: state.weather.isLoading,
      quoteLoading: state.quote.isLoading,
    };
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
      id="dashboard__weather__quote"
    >
      <Row type="flex" align="middle" justify="space-around">
        <Typography.Text type="secondary">
          <Icon type="clock-circle" />
          <Divider type="vertical" style={{ height: '0' }} />
          {formatDate(now, 'HH:mm')}
        </Typography.Text>
        <Divider type="vertical" />
        <Typography.Text type="secondary">
          <img src={icon} alt={icon} width={40} height={40} />
          <Divider type="vertical" style={{ height: '0' }} />
          {temp} ºC
        </Typography.Text>
      </Row>

      <Divider type="horizontal" style={{ height: '0px' }} />
      <Row>
        <Typography.Title level={3} type="secondary">
          {handleGreeting}
        </Typography.Title>
      </Row>
      <Row>
        <Typography.Title level={4} type="secondary">
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

export default memo(Weather);
