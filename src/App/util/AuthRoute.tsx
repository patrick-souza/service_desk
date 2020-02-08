import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticate = true;

type IProps<T> = {
  component: React.ComponentType<T>;
  path: string;
};
export default function AuthRoute<T>(props: IProps<T>) {
  const { component: Component, ...innerProps } = props;
  return (
    <Route
      {...innerProps}
      exact
      render={(routeProps: any): JSX.Element => {
        if (isAuthenticate) return <Component {...routeProps} />;

        return (
          <Redirect
            to={{ pathname: '/', state: { from: routeProps.location } }}
          />
        );
      }}
    />
  );
}
