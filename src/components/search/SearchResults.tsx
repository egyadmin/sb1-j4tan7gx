import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { BookOpen, User, GraduationCap } from 'lucide-react';

interface SearchResultsProps {
  type: 'courses' | 'teachers' | 'students';
  results: any[];
  loading?: boolean;
}

const SearchResults = ({ type, results, loading }: SearchResultsProps) => {
  const { t, language } = useTranslation();

  if (loading) {
    return <div className="text-center py-8">{t('common.loading')}</div>;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('search.noResults')}
      </div>
    );
  }

  const getIcon = () => {
    switch (type) {
      case 'courses':
        return BookOpen;
      case 'teachers':
        return User;
      case 'students':
        return GraduationCap;
      default:
        return BookOpen;
    }
  };

  const Icon = getIcon();

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div
          key={result.id}
          className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">
              {type === 'courses' ? result.title[language] : `${result.firstName} ${result.lastName}`}
            </h3>
            {type === 'courses' && (
              <p className="mt-1 text-sm text-gray-500">
                {result.description[language]}
              </p>
            )}
            {type === 'teachers' && (
              <p className="mt-1 text-sm text-gray-500">
                {result.specialization}
              </p>
            )}
            {type === 'students' && (
              <p className="mt-1 text-sm text-gray-500">
                {result.grade}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;