import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ease-in-out group relative
        ${active
          ? 'bg-emerald-50 text-emerald-700 font-medium'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
    >
      <div className="flex items-center w-full">
        <Icon className={`h-5 w-5 transition-colors duration-200 ${
          active ? 'text-emerald-600' : 'text-gray-500 group-hover:text-gray-700'
        }`} />
        {label && <span className="mr-4 transition-all duration-200">{label}</span>}
        {badge !== undefined && badge > 0 && (
          <span className={`mr-auto px-2 py-0.5 rounded-full text-xs font-medium ${
            active ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {badge}
          </span>
        )}
      </div>
      {active && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-600 rounded-r-full" />
      )}
    </button>
  );
};

export default SidebarItem;