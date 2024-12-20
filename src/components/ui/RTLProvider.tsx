import React from 'react';

interface RTLProviderProps {
  children: React.ReactNode;
}

const RTLProvider = ({ children }: RTLProviderProps) => {
  return (
    <div dir="rtl" className="min-h-screen">
      {children}
    </div>
  );
};

export default RTLProvider;