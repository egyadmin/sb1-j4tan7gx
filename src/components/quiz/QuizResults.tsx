import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface QuizResultsProps {
  results: {
    score: number;
    passed: boolean;
    answers: Array<{
      questionId: string;
      question: { ar: string; en: string };
      userAnswer: string | boolean;
      correctAnswer: string | boolean;
      correct: boolean;
    }>;
  };
  onRetry?: () => void;
  onContinue?: () => void;
}

const QuizResults = ({ results, onRetry, onContinue }: QuizResultsProps) => {
  const { t, language } = useTranslation();

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`p-6 rounded-lg shadow ${
        results.passed ? 'bg-green-50' : 'bg-red-50'
      }`}>
        <div className="flex items-center">
          {results.passed ? (
            <CheckCircle className="h-8 w-8 text-green-600 ml-3" />
          ) : (
            <AlertTriangle className="h-8 w-8 text-red-600 ml-3" />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {results.passed ? t('quiz.passed') : t('quiz.failed')}
            </h2>
            <p className="text-lg">
              {t('quiz.score')}: {results.score}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">{t('quiz.answers')}</h3>
        </div>
        <div className="p-6 space-y-6">
          {results.answers.map((answer, index) => (
            <div key={answer.questionId} className="space-y-2">
              <div className="flex items-start">
                <div className="mt-1">
                  {answer.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="mr-3 flex-1">
                  <p className="font-medium">
                    {index + 1}. {answer.question[language]}
                  </p>
                  <div className="mt-2 text-sm">
                    <p>
                      {t('quiz.yourAnswer')}: <span className={answer.correct ? 'text-green-600' : 'text-red-600'}>
                        {typeof answer.userAnswer === 'boolean' 
                          ? answer.userAnswer ? t('quiz.true') : t('quiz.false')
                          : answer.userAnswer}
                      </span>
                    </p>
                    {!answer.correct && (
                      <p className="text-green-600">
                        {t('quiz.correctAnswer')}: {
                          typeof answer.correctAnswer === 'boolean'
                            ? answer.correctAnswer ? t('quiz.true') : t('quiz.false')
                            : answer.correctAnswer
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {!results.passed && onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {t('quiz.retry')}
          </button>
        )}
        {results.passed && onContinue && (
          <button
            onClick={onContinue}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {t('quiz.continue')}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizResults;