import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
}

const SearchFilters = ({ filters, onFilterChange }: SearchFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-500 ml-2" />
        <h2 className="font-medium">{t('search.filters')}</h2>
      </div>
      
      <div className="space-y-4">
        {/* Add filter options here */}
      </div>
    </div>
  );
};

export default SearchFilters;