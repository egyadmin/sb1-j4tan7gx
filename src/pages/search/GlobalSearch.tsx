import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import SearchBar from '../../components/search/SearchBar';
import SearchResults from '../../components/search/SearchResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const GlobalSearch = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const searchItems = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // Implement API call here
        const response = await fetch(`/api/search/${activeTab}?q=${searchQuery}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchItems, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, activeTab]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('search.title')}</h1>

      <div className="max-w-2xl">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('search.placeholder')}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">{t('search.courses')}</TabsTrigger>
          <TabsTrigger value="teachers">{t('search.teachers')}</TabsTrigger>
          <TabsTrigger value="students">{t('search.students')}</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <SearchResults
            type="courses"
            results={results}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="teachers">
          <SearchResults
            type="teachers"
            results={results}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="students">
          <SearchResults
            type="students"
            results={results}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalSearch;