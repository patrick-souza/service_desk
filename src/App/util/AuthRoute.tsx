import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import Header from 'App/Components/Header';
import { IApplicationState } from 'App/Redux/modules';

type IProps<T> = {
  component: React.ComponentType<T>;
  path: string;
};
export default function AuthRoute<T>(props: IProps<T>) {
  const userIsAuthenticate = useSelector(
    (state: IApplicationState) => state.auth.userIsAuthenticate
  );
  const { component: Component, ...innerProps } = props;
  return (
    <Route
      {...innerProps}
      exact
      render={(routeProps: any): JSX.Element => {
        if (userIsAuthenticate)
          return (
            <Layout>
              <Header />
              <Layout.Content>
                <Component {...routeProps} />
              </Layout.Content>
            </Layout>
          );

        return (
          <Redirect
            to={{ pathname: '/', state: { from: routeProps.location } }}
          />
        );
      }}
    />
  );
}
