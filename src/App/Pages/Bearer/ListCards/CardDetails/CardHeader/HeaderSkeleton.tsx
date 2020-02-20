import React from 'react';
import { Skeleton, Collapse } from 'antd';

export default function CardHeaderSkeleton() {
  return (
    <Collapse.Panel
      style={{
        borderLeft: `4px solid #122A4E`,
        background: '#fff',
        borderTop: '1px solid #ddd',
        marginBottom: '16px',
      }}
      header={
        <Skeleton
          active
          avatar={{ shape: 'square', size: 'large' }}
          paragraph={{ rows: 2 }}
        />
      }
      key=""
    ></Collapse.Panel>
  );
}
