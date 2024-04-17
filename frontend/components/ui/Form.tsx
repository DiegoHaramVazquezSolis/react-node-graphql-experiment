import React, { FormEventHandler, ReactNode } from 'react';

const FormActions = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-end gap-2">
    {children}
  </div>
);

const FormBody = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-4">
    {children}
  </div>
);

interface FormProps {
  children: ReactNode
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined
};

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export {
  Form,
  FormBody,
  FormActions,
};