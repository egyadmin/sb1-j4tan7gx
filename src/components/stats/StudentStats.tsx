import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { LineChart, TrendingUp, BookOpen } from 'lucide-react';

interface StudentStatsProps {
  averageGrade: number;
  completedUnits: number;
  totalUnits: number;
  courseProgress: {
    courseName: { ar: string; en: string };
    progress: number;
    grade: number;
  }[];
}

const StudentStats = ({ averageGrade, completedUnits, totalUnits, courseProgress }: StudentStatsProps) => {
  const { t, language } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <LineChart className="h-10 w-10 text-indigo-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.averageGrade')}</h2>
              <p className="text-3xl font-bold text-gray-900">{averageGrade}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-green-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.progress')}</h2>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round((completedUnits / totalUnits) * 100)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.completedUnits')}</h2>
              <p className="text-3xl font-bold text-gray-900">
                {completedUnits}/{totalUnits}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{t('stats.courseProgress')}</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {courseProgress.map((course, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium">{course.courseName[language]}</h3>
                  <div className="mt-2 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
                      <div
                        style={{ width: `${course.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="mr-8 text-lg font-semibold text-gray-700">
                  {course.grade}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;