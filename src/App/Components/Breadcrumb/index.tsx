import React, { useCallback, memo } from 'react';
import { Breadcrumb as BreadcrumbAntd, Typography } from 'antd';
import './index.css';
import { Link } from 'react-router-dom';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

type IProps = {
  pages: { path: string; breadcrumbName: string }[];
};

function Breadcrumb({ pages }: IProps) {
  const itemRender = useCallback((route: Route, _: any, routes: Route[]) => {
    const last = routes.indexOf(route) === routes.length - 1;

    return last ? (
      <Typography.Text strong>{route.breadcrumbName}</Typography.Text>
    ) : (
      <Link to={`/${route.path}`}>
        <Typography.Text>{route.breadcrumbName}</Typography.Text>
      </Link>
    );
  }, []);

  return (
    <BreadcrumbAntd itemRender={itemRender} routes={pages} separator=">" />
  );
}
export default memo(Breadcrumb);
