import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Upload } from 'lucide-react';

interface UnitFormProps {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}

const UnitForm = ({ onSubmit, initialData }: UnitFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: initialData?.title || { ar: '', en: '' },
    content: initialData?.content || { ar: '', en: '' },
    difficulty: initialData?.difficulty || 'beginner',
    order: initialData?.order || 1,
    resources: initialData?.resources || []
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    // Handle file upload logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('units.titleAr')}
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
            {t('units.titleEn')}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('units.difficulty')}
        </label>
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            difficulty: e.target.value
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="beginner">{t('units.difficultyBeginner')}</option>
          <option value="intermediate">{t('units.difficultyIntermediate')}</option>
          <option value="advanced">{t('units.difficultyAdvanced')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('units.order')}
        </label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            order: parseInt(e.target.value)
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('units.resources')}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>{t('units.uploadFile')}</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                  accept=".pdf,video/*"
                />
              </label>
            </div>
          </div>
        </div>
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

export default UnitForm;