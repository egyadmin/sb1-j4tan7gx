import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Upload, Plus, X } from 'lucide-react';

interface UnitEditorProps {
  initialData?: any;
  onSave: (data: any) => Promise<void>;
}

const UnitEditor = ({ initialData, onSave }: UnitEditorProps) => {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    title: initialData?.title || { ar: '', en: '' },
    content: initialData?.content || { ar: '', en: '' },
    difficulty: initialData?.difficulty || 'beginner',
    resources: initialData?.resources || [],
    order: initialData?.order || 1,
    isDeprecated: initialData?.isDeprecated || false
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Handle file upload logic here
      // Update resources array after successful upload
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('units.contentAr')}
          </label>
          <textarea
            value={formData.content.ar}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              content: { ...prev.content, ar: e.target.value }
            }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('units.contentEn')}
          </label>
          <textarea
            value={formData.content.en}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              content: { ...prev.content, en: e.target.value }
            }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('units.resources')}
        </label>
        <div className="space-y-4">
          {formData.resources.map((resource: any, index: number) => (
            <div key={index} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{resource.title[language]}</p>
                <p className="text-sm text-gray-500">{resource.type}</p>
              </div>
              {resource.isDeprecated && (
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  {t('units.deprecated')}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  const newResources = [...formData.resources];
                  newResources[index].isDeprecated = !newResources[index].isDeprecated;
                  setFormData(prev => ({ ...prev, resources: newResources }));
                }}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}

          <div className="mt-2">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <span>{t('units.uploadResource')}</span>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleFileUpload}
                      accept=".pdf,video/*"
                      disabled={uploading}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {t('units.supportedFormats')}
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {saving ? t('common.saving') : t('common.save')}
        </button>
      </div>
    </form>
  );
};

export default UnitEditor;