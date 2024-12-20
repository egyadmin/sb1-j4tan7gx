import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import SearchHeader from './components/SearchHeader';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import { useSearch } from './hooks/useSearch';

const Search = () => {
  const { t } = useTranslation();
  const { 
    query, 
    filters, 
    results, 
    loading,
    setQuery,
    setFilters 
  } = useSearch();

  return (
    <div className="space-y-6">
      <SearchHeader query={query} onQueryChange={setQuery} />
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <SearchFilters filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="flex-1">
          <SearchResults results={results} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Search;