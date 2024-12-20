import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Timer, AlertCircle } from 'lucide-react';

interface QuizAttemptProps {
  quiz: {
    id: string;
    timeLimit: number;
    questions: Array<{
      id: string;
      text: { ar: string; en: string };
      type: 'multiple_choice' | 'true_false';
      options?: Array<{ ar: string; en: string }>;
    }>;
  };
  onSubmit: (answers: Array<{ questionId: string; answer: string | boolean }>) => Promise<void>;
}

const QuizAttempt = ({ quiz, onSubmit }: QuizAttemptProps) => {
  const { t, language } = useTranslation();
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));
      await onSubmit(formattedAnswers);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <div className="flex items-center">
          <Timer className="h-5 w-5 text-indigo-600 ml-2" />
          <span className="text-lg font-medium">{formatTime(timeLeft)}</span>
        </div>
        {timeLeft < 300 && (
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 ml-2" />
            <span>{t('quiz.timeWarning')}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">
              {index + 1}. {question.text[language]}
            </h3>

            {question.type === 'multiple_choice' ? (
              <div className="space-y-3">
                {question.options?.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={question.id}
                      value={optionIndex}
                      checked={answers[question.id] === optionIndex.toString()}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        [question.id]: e.target.value
                      }))}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{option[language]}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex space-x-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={question.id}
                    value="true"
                    checked={answers[question.id] === true}
                    onChange={() => setAnswers(prev => ({
                      ...prev,
                      [question.id]: true
                    }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{t('quiz.true')}</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={question.id}
                    value="false"
                    checked={answers[question.id] === false}
                    onChange={() => setAnswers(prev => ({
                      ...prev,
                      [question.id]: false
                    }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{t('quiz.false')}</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || Object.keys(answers).length !== quiz.questions.length}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? t('quiz.submitting') : t('quiz.submit')}
      </button>
    </div>
  );
};

export default QuizAttempt;