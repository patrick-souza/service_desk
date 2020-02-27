import React, { memo } from 'react';
import { Pagination, Divider } from 'antd';

type IProps = {
  onChange?:
    | ((page: number, pageSize?: number | undefined) => void)
    | undefined;
  defaultCurrent: number;
  total: number;
  current?: number;
};

function CustomPagination({
  total,
  onChange,
  defaultCurrent,
  current,
}: IProps) {
  return (
    <>
      <Divider style={{ height: 0, margin: '8px 0' }} />
      <Pagination
        pageSizeOptions={['5']}
        defaultPageSize={5}
        onChange={onChange}
        current={current}
        defaultCurrent={defaultCurrent}
        showTotal={length => `Total ${length} ${length > 1 ? 'Itens' : 'Item'}`}
        total={total}
      />
    </>
  );
}

export default memo(CustomPagination);
