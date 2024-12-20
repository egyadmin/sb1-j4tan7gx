import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Users, Award, TrendingUp } from 'lucide-react';

interface CourseCompletionStatsProps {
  courseId: string;
  totalStudents: number;
  completedStudents: number;
  averageProgress: number;
}

const CourseCompletionStats = ({ 
  totalStudents, 
  completedStudents, 
  averageProgress 
}: CourseCompletionStatsProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Users className="h-10 w-10 text-indigo-600" />
          <div className="mr-4">
            <h2 className="text-lg font-semibold">{t('courses.totalStudents')}</h2>
            <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Award className="h-10 w-10 text-green-600" />
          <div className="mr-4">
            <h2 className="text-lg font-semibold">{t('courses.completedStudents')}</h2>
            <p className="text-3xl font-bold text-gray-900">{completedStudents}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <TrendingUp className="h-10 w-10 text-blue-600" />
          <div className="mr-4">
            <h2 className="text-lg font-semibold">{t('courses.averageProgress')}</h2>
            <p className="text-3xl font-bold text-gray-900">{averageProgress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCompletionStats;