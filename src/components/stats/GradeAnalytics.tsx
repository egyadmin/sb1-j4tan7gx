import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { BarChart2, TrendingUp, Award } from 'lucide-react';

interface GradeAnalyticsProps {
  averageGrade: number;
  highestGrade: number;
  totalAssessments: number;
  gradeDistribution: { grade: string; count: number }[];
}

const GradeAnalytics = ({ averageGrade, highestGrade, totalAssessments, gradeDistribution }: GradeAnalyticsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BarChart2 className="h-10 w-10 text-indigo-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.averageGrade')}</h2>
              <p className="text-3xl font-bold text-gray-900">{averageGrade}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-green-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.highestGrade')}</h2>
              <p className="text-3xl font-bold text-gray-900">{highestGrade}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-blue-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.totalAssessments')}</h2>
              <p className="text-3xl font-bold text-gray-900">{totalAssessments}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">{t('stats.gradeDistribution')}</h3>
        <div className="space-y-4">
          {gradeDistribution.map((item) => (
            <div key={item.grade} className="flex items-center">
              <span className="w-16 text-sm text-gray-600">{item.grade}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(item.count / totalAssessments) * 100}%` }}
                  />
                </div>
              </div>
              <span className="w-16 text-sm text-gray-600 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeAnalytics;