import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  language: string;
  toggleLanguage: () => void;
}

const LanguageToggle = ({ language, toggleLanguage }: LanguageToggleProps) => {
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center text-white hover:text-gray-200"
    >
      <Languages className="h-5 w-5 mr-1" />
      {language.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;