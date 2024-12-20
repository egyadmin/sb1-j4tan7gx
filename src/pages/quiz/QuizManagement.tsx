import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import QuizBuilder from '../../components/quiz/QuizBuilder';

const QuizManagement = () => {
  const { t } = useTranslation();
  const [selectedUnit, setSelectedUnit] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('quiz.management')}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="max-w-md mb-6">
          <label htmlFor="unitSelect" className="block text-sm font-medium text-gray-700">
            {t('quiz.selectUnit')}
          </label>
          <select
            id="unitSelect"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{t('quiz.selectUnitPrompt')}</option>
            {/* Unit options will be populated here */}
          </select>
        </div>

        {selectedUnit && (
          <QuizBuilder
            onSave={async (data) => {
              // Handle quiz save
              console.log(data);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QuizManagement;