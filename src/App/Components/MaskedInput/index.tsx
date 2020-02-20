import React from 'react';
import Masked from 'react-input-mask';
import { Input } from 'antd';

type IProps = {
  mask: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
};
export default function MaskedInput({
  mask,
  name,
  onChange,
  onBlur,
  value,
  id,
  placeholder,
  disabled,
  ref,
}: IProps) {
  return (
    <Masked
      mask={mask}
      inputRef={ref}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      disabled={disabled}
      maskChar=""
    >
      {(props: any) => <Input {...props} disabled={disabled} />}
    </Masked>
  );
}
