import React, { useMemo } from 'react';
import { Typography, Divider, Row } from 'antd';
import { IStatusCard } from 'App/Redux/modules/Card';

export const stateDictionary = {
  A: { label: 'Ativo', color: '#24c35b' },
  C: { label: 'Cancelado', color: '#d60000' },
  P: { label: 'Pré-Bloqueio', color: '#bebebe' },
  B: { label: 'Bloqueado', color: '#dda900' },
  T: { label: '', color: '' },
};

function Circle({ color }: { color: string }) {
  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: color,
        margin: '0 4px',
      }}
    />
  );
}

type IProps = {
  state: IStatusCard;
};
export default function LabelStatus({ state }: IProps) {
  const { color, label } = useMemo(() => stateDictionary[state], [state]);

  return (
    <Row type="flex" align="middle">
      <Circle color={color} />
      <Typography.Text>{label}</Typography.Text>
      <Divider type="vertical" style={{ height: 0 }} />
    </Row>
  );
}
