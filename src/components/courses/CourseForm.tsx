import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Course } from '../../types/content';

interface CourseFormProps {
  course?: Partial<Course>;
  onSubmit: (data: any) => Promise<void>;
}

const CourseForm = ({ course, onSubmit }: CourseFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: course?.title || { ar: '', en: '' },
    description: course?.description || { ar: '', en: '' },
    keywords: course?.keywords || [],
    difficulty: course?.difficulty || 'beginner'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordAdd = (lang: 'ar' | 'en', value: string) => {
    const newKeyword = { ar: '', en: '' };
    newKeyword[lang] = value;
    setFormData(prev => ({
      ...prev,
      keywords: [...prev.keywords, newKeyword]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('courses.titleAr')}
          </label>
          <input
            type="text"
            value={formData.title.ar}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              title: { ...prev.title, ar: e.target.value }
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('courses.titleEn')}
          </label>
          <input
            type="text"
            value={formData.title.en}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              title: { ...prev.title, en: e.target.value }
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('courses.descriptionAr')}
          </label>
          <textarea
            value={formData.description.ar}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              description: { ...prev.description, ar: e.target.value }
            }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('courses.descriptionEn')}
          </label>
          <textarea
            value={formData.description.en}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              description: { ...prev.description, en: e.target.value }
            }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('courses.difficulty')}
        </label>
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            difficulty: e.target.value as Course['difficulty']
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="beginner">{t('courses.difficultyBeginner')}</option>
          <option value="intermediate">{t('courses.difficultyIntermediate')}</option>
          <option value="advanced">{t('courses.difficultyAdvanced')}</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? t('common.saving') : t('common.save')}
      </button>
    </form>
  );
};

export default CourseForm;