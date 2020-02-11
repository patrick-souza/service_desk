import React, { useState, useMemo, createRef, useRef, useEffect } from 'react';
import { Typography, Tabs, Row, Form, Divider } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'App/Components/MaskedInput';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from 'App/Redux/modules';
import {
  hideDialog,
  fetchDataBearer,
  ITypeOfSearch,
  resetSearch,
} from 'App/Redux/modules/Search';
import ResultCards from './ResultCards';
import Modal from 'App/Components/Modal';
import Search from 'antd/lib/input/Search';
export default function Dialog() {
  const { isLoading, openDialog, result } = useSelector(
    (state: IApplicationState) => state.search
  );
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<ITypeOfSearch>('CPF');

  const formik = useFormik({
    initialValues: {
      termSearch: '',
    },
    validationSchema: Yup.object().shape({
      termSearch: Yup.string().required(),
    }),
    onSubmit: ({ termSearch }) => {
      const unmasked = termSearch.replace(/\D+/g, '');

      dispatch(fetchDataBearer(activeTab, unmasked));
    },
  });

  const tabs = useMemo(
    () => [
      {
        key: 'CPF',
        placeholder: 'CPF',
        mask: '999.999.999-99',
        name: 'cpf',
      },
      {
        key: 'CNPJ',
        placeholder: 'CNPJ',
        mask: '99.999.999/9999-99',
        name: 'cnpj',
      },
      {
        key: 'ACCOUNT_ID',
        placeholder: 'Nº da Conta',
        mask: '99999999999999999',
        name: 'nº_conta',
      },
      {
        key: 'ORDER_ID',
        placeholder: 'Nº do Pedido',
        mask: '99999999999999999',
        name: 'nº_pedido',
        resultList: true,
      },
      {
        key: 'ORDER_ITEM_ID',
        placeholder: 'Nº do Item',
        mask: '99999999999999999',
        name: 'nº_item_do_pedido',
        resultList: true,
      },
    ],
    []
  );

  const handleChangeTab = (key: string) => {
    setActiveTab(key as ITypeOfSearch);
    formik.resetForm();
    dispatch(resetSearch());
  };

  return (
    <Modal
      title={<Typography.Text strong>Buscar</Typography.Text>}
      visible={openDialog}
      okText="Buscar"
      loading={isLoading}
      cancelText="Cancelar"
      onOk={() => formik.submitForm()}
      onCancel={() => {
        dispatch(hideDialog());
      }}
    >
      <Typography.Text strong>
        Selecione o que você quer buscar?
      </Typography.Text>
      <Form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Tabs defaultActiveKey="CPF" onChange={handleChangeTab} type="card">
          {tabs.map(tab => (
            <Tabs.TabPane tab={tab.placeholder} key={tab.key}>
              <Row type="flex" style={{ minHeight: '100px' }} align="middle">
                <Form.Item
                  style={{ width: '100%' }}
                  validateStatus={
                    !!formik.errors.termSearch && formik.touched.termSearch
                      ? 'error'
                      : ''
                  }
                  help={formik.errors.termSearch}
                >
                  <MaskedInput
                    mask={tab.mask}
                    name="termSearch"
                    placeholder={`Digite o ${tab.placeholder}`}
                    value={formik.values.termSearch}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                  />
                </Form.Item>
              </Row>
              {tab.resultList && result.length >= 1 && (
                <>
                  {result.map(({ image, truncated_number, card_code }) => (
                    <Row type="flex" justify="center" key={card_code}>
                      <ResultCards
                        image={image}
                        truncatedNumber={truncated_number}
                        cardCode={card_code}
                      />
                    </Row>
                  ))}
                </>
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
    </Modal>
  );
}
