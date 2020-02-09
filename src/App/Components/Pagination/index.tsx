import React from 'react';
import { Pagination, Divider } from 'antd';
type IProps = {
  onShowSizeChange?: ((current: number, size: number) => void) | undefined;
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
  onShowSizeChange,
  defaultCurrent,
  current,
}: IProps) {
  return (
    <>
      <Divider style={{ height: 0 }} />
      <Pagination
        showSizeChanger
        defaultPageSize={5}
        pageSizeOptions={['5', '10']}
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        current={current}
        defaultCurrent={defaultCurrent}
        showTotal={total => `Total ${total} itens`}
        total={total}
      />
    </>
  );
}
