import React, { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  variant?: "primary" | "ghost";
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({ variant = "primary", type = "button", children, onClick }: ButtonProps) => {
  const variants = {
    primary: "bg-slate-100 hover:bg-slate-100/80 text-slate-800",
    ghost: "bg-transparent hover:bg-slate-800/80 text-slate-50"
  };

  return (
    <button
      className={`rounded-lg px-4 py-2 text-lg font-semibold transition-colors ${variants[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {
  Button
};