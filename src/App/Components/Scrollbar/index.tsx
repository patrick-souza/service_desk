import React, { PropsWithChildren, CSSProperties } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default function Scrollbar({
  children,
  style,
}: PropsWithChildren<{ style: CSSProperties }>) {
  return (
    <Scrollbars autoHide style={style}>
      {children}
    </Scrollbars>
  );
}
