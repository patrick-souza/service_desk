import React, { createRef, useEffect } from 'react';
import { Row, Card, Typography, Input, Divider } from 'antd';
import Dialog from './Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from 'App/Redux/modules/Search';
import { IApplicationState } from 'App/Redux/modules';
import SearchRef from 'antd/lib/input/Search';

export default function Search() {
  const openDialog = useSelector(
    (state: IApplicationState) => state.search.openDialog
  );
  const dispatch = useDispatch();

  const inputRef = createRef<SearchRef>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [openDialog, inputRef]);

  return (
    <Row>
      <Card>
        <Typography.Text strong>Busca</Typography.Text>
        <Divider style={{ height: '0px' }} />
        <Row
          type="flex"
          align="middle"
          onClick={() => {
            dispatch(showDialog());
          }}
        >
          <Input.Search
            ref={inputRef}
            placeholder="CPF, CNPJ, ID do cartão e conta"
            enterButton
          />
        </Row>
      </Card>
      <Dialog />
    </Row>
  );
}
