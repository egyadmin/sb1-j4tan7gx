import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Users, Award, Activity } from 'lucide-react';

interface TeacherStatsProps {
  courseId: string;
  averageGrade: number;
  totalStudents: number;
  completionRate: number;
  studentPerformance: {
    studentName: string;
    grade: number;
    completedUnits: number;
  }[];
}

const TeacherStats = ({ averageGrade, totalStudents, completionRate, studentPerformance }: TeacherStatsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-indigo-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.courseAverage')}</h2>
              <p className="text-3xl font-bold text-gray-900">{averageGrade}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-green-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.enrolledStudents')}</h2>
              <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-10 w-10 text-blue-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">{t('stats.completionRate')}</h2>
              <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{t('stats.studentPerformance')}</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {studentPerformance.map((student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{student.studentName}</h3>
                  <div className="mt-2 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
                      <div
                        style={{ width: `${(student.completedUnits / totalStudents) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="mr-8 text-lg font-semibold text-gray-700">
                  {student.grade}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStats;