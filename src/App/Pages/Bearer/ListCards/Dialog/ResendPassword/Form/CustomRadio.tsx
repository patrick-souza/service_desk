import React, { useState, memo } from 'react';
import { Radio, Row, Icon, Input, Form, Divider, Tooltip } from 'antd';
import { useFormik } from 'formik';
import Yup from 'App/Util/Yup';
import MaskedInput from 'App/Components/MaskedInput';

type IProps = {
  onSelect: (value: { sms?: string; email?: string }) => void;
  type: 'sms' | 'email';
  value: string;
  validation?: Yup.Schema<string> | Yup.Ref;
  editPlaceholder?: string;
  mask?: string;
};
function CustomOption({
  validation,
  onSelect,
  value,
  type,
  editPlaceholder,
  mask,
}: IProps) {
  const [edit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      newValue: value,
    },
    validationSchema: Yup.object().shape({
      newValue: validation || Yup.string(),
    }),
    validateOnChange: true,
    onSubmit: ({ newValue }) => {
      onSelect({ [type]: newValue });
    },
  });
  return (
    <Row type="flex" align="middle" justify="space-between">
      {edit ? (
        <Form.Item
          style={{
            flex: 1,
            marginRight: 5,
            alignItems: 'center',
          }}
          validateStatus={formik.errors.newValue ? 'error' : 'success'}
          help={formik.errors.newValue}
        >
          {mask ? (
            <MaskedInput
              mask={mask}
              placeholder={editPlaceholder || 'Digite o novo valor'}
              onChange={formik.handleChange}
              value={formik.values.newValue}
              name="newValue"
            />
          ) : (
            <Input
              placeholder={editPlaceholder || 'Digite o novo valor'}
              onChange={formik.handleChange}
              value={formik.values.newValue}
              name="newValue"
            />
          )}
        </Form.Item>
      ) : (
        <Radio value={type}>{value}</Radio>
      )}
      {edit ? (
        <div style={{ marginBottom: 24 }}>
          <Tooltip title="Cancelar">
            <Icon
              type="delete"
              onClick={() => {
                formik.resetForm();
                setEdit(prev => !prev);
              }}
              theme="twoTone"
              twoToneColor="#d60000"
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Salvar">
            <Icon
              type="save"
              onClick={() => {
                if (formik.isValid) {
                  formik.submitForm();
                  setEdit(prev => !prev);
                }
              }}
              theme="twoTone"
              twoToneColor={!formik.isValid ? '#ddd' : '#24c35b'}
            />
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Editar">
          <Icon
            type="edit"
            onClick={() => setEdit(prev => !prev)}
            theme="twoTone"
          />
        </Tooltip>
      )}
    </Row>
  );
}

export default memo(CustomOption);
