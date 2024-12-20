import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Search } from 'lucide-react';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchHeader = ({ query, onQueryChange }: SearchHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('search.title')}</h1>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchHeader;