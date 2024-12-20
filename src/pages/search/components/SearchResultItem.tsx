import React from 'react';
import { BookOpen, User, GraduationCap } from 'lucide-react';

interface SearchResultItemProps {
  result: any;
}

const SearchResultItem = ({ result }: SearchResultItemProps) => {
  const getIcon = () => {
    switch (result.type) {
      case 'course':
        return <BookOpen className="h-5 w-5 text-emerald-600" />;
      case 'teacher':
        return <User className="h-5 w-5 text-blue-600" />;
      case 'student':
        return <GraduationCap className="h-5 w-5 text-indigo-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="mr-4 flex-1">
        <h3 className="font-medium text-gray-900">{result.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{result.description}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;