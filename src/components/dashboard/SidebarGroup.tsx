import React from 'react';

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
}

const SidebarGroup = ({ title, children }: SidebarGroupProps) => {
  if (!title) return <div className="space-y-1.5">{children}</div>;

  return (
    <div className="px-3 py-4">
      <h2 className="mb-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
        {title}
      </h2>
      <div className="space-y-1.5">
        {children}
      </div>
    </div>
  );
};

export default SidebarGroup;