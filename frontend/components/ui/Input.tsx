import React from 'react';

interface InputProps {
  placeholder?: string | undefined,
  value?: string | undefined,
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const Input = ({ placeholder, value, onChange }: InputProps) => {
  return (
    <input
      className='bg-slate-800 rounded-lg p-2'
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export {
  Input
};