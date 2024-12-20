import React from 'react';

interface TabsProps {
  value: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs = ({ value, onValueChange, children, defaultValue }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || value);

  const handleValueChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className="space-y-4">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            value: activeTab, 
            onValueChange: handleValueChange 
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className="flex space-x-2 border-b border-gray-200">
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none
        ${value === value
          ? 'border-emerald-500 text-emerald-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }: TabsContentProps) => {
  return <div className="mt-4">{children}</div>;
};