import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { TrendingUp, Award, Target } from 'lucide-react';

const Progress = () => {
  const { t } = useTranslation();

  const courses = [
    {
      name: 'الرياضيات المتقدمة',
      progress: 75,
      grade: 'A',
      status: 'في تقدم'
    },
    {
      name: 'الفيزياء',
      progress: 60,
      grade: 'B+',
      status: 'في تقدم'
    },
    {
      name: 'الكيمياء',
      progress: 90,
      grade: 'A+',
      status: 'مكتمل'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">التقدم الدراسي</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-emerald-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">معدل التقدم</h2>
              <p className="text-3xl font-bold text-gray-900">75%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-blue-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">المعدل التراكمي</h2>
              <p className="text-3xl font-bold text-gray-900">3.8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Target className="h-10 w-10 text-indigo-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">الأهداف المحققة</h2>
              <p className="text-3xl font-bold text-gray-900">12/15</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">تقدم المواد الدراسية</h2>
          <div className="space-y-6">
            {courses.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{course.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    course.status === 'مكتمل' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 ml-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;