import React, { ReactNode } from 'react';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex flex-col justify-center p-12 sm:p-48">
      {children}
    </div>
  );
};

export {
  PageWrapper
};