import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  results: any[];
  loading: boolean;
}

const SearchResults = ({ results, loading }: SearchResultsProps) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('search.loading')}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('search.noResults')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <SearchResultItem key={index} result={result} />
      ))}
    </div>
  );
};

export default SearchResults;