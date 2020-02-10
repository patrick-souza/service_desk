import React from 'react';
import Masked, { InputState, MaskOptions } from 'react-input-mask';
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
}: IProps) {
  return (
    <Masked
      mask={mask}
      beforeMaskedValueChange={(
        newState: InputState,
        oldState: InputState,
        userInput: string,
        maskOptions: MaskOptions
      ): InputState => {
        console.log(newState, oldState, userInput, maskOptions);

        return newState;
      }}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      disabled={disabled}
    >
      {(props: any) => <Input {...props} />}
    </Masked>
  );
}
