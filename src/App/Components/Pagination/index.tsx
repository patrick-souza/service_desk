import React from 'react';
import { Pagination, Divider } from 'antd';
type IProps = {
  onChange?:
    | ((page: number, pageSize?: number | undefined) => void)
    | undefined;
  defaultCurrent: number;
  total: number;
  current?: number;
};

export default function CustomPagination({
  total,
  onChange,
  defaultCurrent,
  current,
}: IProps) {
  return (
    <>
      <Divider style={{ height: 0 }} />
      <Pagination
        pageSizeOptions={['5']}
        onChange={onChange}
        current={current}
        defaultCurrent={defaultCurrent}
        showTotal={total => `Total ${total} ${total > 1 ? 'Itens' : 'Item'}`}
        total={total}
      />
    </>
  );
}
