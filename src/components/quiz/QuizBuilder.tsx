import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Plus, Trash2 } from 'lucide-react';

interface QuizBuilderProps {
  onSave: (data: any) => Promise<void>;
  initialData?: any;
}

const QuizBuilder = ({ onSave, initialData }: QuizBuilderProps) => {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    questions: initialData?.questions || [],
    timeLimit: initialData?.timeLimit || 30,
    minimumPassingScore: initialData?.minimumPassingScore || 70
  });
  const [saving, setSaving] = useState(false);

  const addQuestion = (type: 'multiple_choice' | 'true_false') => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, {
        text: { ar: '', en: '' },
        type,
        options: type === 'multiple_choice' ? Array(4).fill({ ar: '', en: '' }) : undefined,
        correctAnswer: type === 'multiple_choice' ? 0 : false
      }]
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <button
            type="button"
            onClick={() => addQuestion('multiple_choice')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('quiz.addMultipleChoice')}
          </button>
          <button
            type="button"
            onClick={() => addQuestion('true_false')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('quiz.addTrueFalse')}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('quiz.timeLimit')}
            </label>
            <input
              type="number"
              value={formData.timeLimit}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                timeLimit: parseInt(e.target.value)
              }))}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('quiz.passingScore')}
            </label>
            <input
              type="number"
              value={formData.minimumPassingScore}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                minimumPassingScore: parseInt(e.target.value)
              }))}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {formData.questions.map((question: any, index: number) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">
                {t('quiz.questionNumber', { number: index + 1 })}
              </h3>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('quiz.questionTextAr')}
                </label>
                <input
                  type="text"
                  value={question.text.ar}
                  onChange={(e) => {
                    const newQuestions = [...formData.questions];
                    newQuestions[index].text.ar = e.target.value;
                    setFormData(prev => ({ ...prev, questions: newQuestions }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('quiz.questionTextEn')}
                </label>
                <input
                  type="text"
                  value={question.text.en}
                  onChange={(e) => {
                    const newQuestions = [...formData.questions];
                    newQuestions[index].text.en = e.target.value;
                    setFormData(prev => ({ ...prev, questions: newQuestions }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {question.type === 'multiple_choice' ? (
              <div className="space-y-4">
                {question.options.map((option: any, optionIndex: number) => (
                  <div key={optionIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={option.ar}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions];
                          newQuestions[index].options[optionIndex].ar = e.target.value;
                          setFormData(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder={t('quiz.optionAr')}
                        dir="rtl"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={option.en}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions];
                          newQuestions[index].options[optionIndex].en = e.target.value;
                          setFormData(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder={t('quiz.optionEn')}
                      />
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => {
                          const newQuestions = [...formData.questions];
                          newQuestions[index].correctAnswer = optionIndex;
                          setFormData(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`correct-${index}`}
                    checked={question.correctAnswer === true}
                    onChange={() => {
                      const newQuestions = [...formData.questions];
                      newQuestions[index].correctAnswer = true;
                      setFormData(prev => ({ ...prev, questions: newQuestions }));
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="mr-2">{t('quiz.true')}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`correct-${index}`}
                    checked={question.correctAnswer === false}
                    onChange={() => {
                      const newQuestions = [...formData.questions];
                      newQuestions[index].correctAnswer = false;
                      setFormData(prev => ({ ...prev, questions: newQuestions }));
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="mr-2">{t('quiz.false')}</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {saving ? t('common.saving') : t('common.save')}
      </button>
    </form>
  );
};

export default QuizBuilder;