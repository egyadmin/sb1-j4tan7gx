import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Course, BilingualContent } from '../../types/content';

interface KeywordsModalProps {
  course: Course;
  onClose: () => void;
  onSave: (keywords: BilingualContent[]) => Promise<void>;
}

const KeywordsModal = ({ course, onClose, onSave }: KeywordsModalProps) => {
  const { t, language } = useTranslation();
  const [keywords, setKeywords] = useState<BilingualContent[]>(course.keywords || []);
  const [newKeyword, setNewKeyword] = useState<BilingualContent>({ ar: '', en: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleAddKeyword = () => {
    if (newKeyword.ar.trim() && newKeyword.en.trim()) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword({ ar: '', en: '' });
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(keywords);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{t('management.courseKeywords')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyword.ar}
              onChange={(e) => setNewKeyword({ ...newKeyword, ar: e.target.value })}
              placeholder={t('management.keywordAr')}
              className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              dir="rtl"
            />
            <input
              type="text"
              value={newKeyword.en}
              onChange={(e) => setNewKeyword({ ...newKeyword, en: e.target.value })}
              placeholder={t('management.keywordEn')}
              className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleAddKeyword}
              className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex gap-4 flex-1">
                  <span className="text-gray-700">{keyword.ar}</span>
                  <span className="text-gray-700">{keyword.en}</span>
                </div>
                <button
                  onClick={() => handleRemoveKeyword(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSaving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeywordsModal;