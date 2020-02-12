import React from 'react';
import { Breadcrumb as BreadcrumbAntd, Typography } from 'antd';
import './index.css';
import { Link } from 'react-router-dom';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

type IProps = {
  routes: { path: string; breadcrumbName: string }[];
};

export default function Breadcrumb(props: IProps) {
  const itemRender = (route: Route, _: any, routes: Route[]) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <Typography.Text strong>{route.breadcrumbName}</Typography.Text>
    ) : (
      <Link to={`/${route.path}`}>
        <Typography.Text>{route.breadcrumbName}</Typography.Text>
      </Link>
    );
  };

  return (
    <BreadcrumbAntd
      itemRender={itemRender}
      routes={props.routes}
      separator=">"
    />
  );
}
