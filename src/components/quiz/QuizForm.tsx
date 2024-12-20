import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';

interface Question {
  text: { ar: string; en: string };
  type: 'multiple_choice' | 'true_false';
  options?: { ar: string; en: string }[];
  correctAnswer: string | boolean;
}

interface QuizFormProps {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}

const QuizForm = ({ onSubmit, initialData }: QuizFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    questions: initialData?.questions || [],
    timeLimit: initialData?.timeLimit || 30,
    minimumPassingScore: initialData?.minimumPassingScore || 70
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

  const addQuestion = (type: Question['type']) => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, {
        text: { ar: '', en: '' },
        type,
        options: type === 'multiple_choice' ? [] : undefined,
        correctAnswer: type === 'multiple_choice' ? '' : false
      }]
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {formData.questions.map((question, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t('quiz.questionNumber', { number: index + 1 })}</h3>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-red-600 hover:text-red-800"
              >
                {t('common.remove')}
              </button>
            </div>

            <div className="space-y-4">
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

              {question.type === 'multiple_choice' && (
                <div className="space-y-2">
                  {question.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex gap-4">
                      <input
                        type="text"
                        value={option.ar}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions];
                          newQuestions[index].options![optionIndex].ar = e.target.value;
                          setFormData(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder={t('quiz.optionAr')}
                        dir="rtl"
                      />
                      <input
                        type="text"
                        value={option.en}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions];
                          newQuestions[index].options![optionIndex].en = e.target.value;
                          setFormData(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder={t('quiz.optionEn')}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => addQuestion('multiple_choice')}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {t('quiz.addMultipleChoice')}
        </button>
        <button
          type="button"
          onClick={() => addQuestion('true_false')}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t('quiz.addTrueFalse')}
        </button>
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

export default QuizForm;