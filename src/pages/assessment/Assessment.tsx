import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Assessment = () => {
  const { t } = useTranslation();

  const assessments = [
    {
      title: 'اختبار الرياضيات النهائي',
      dueDate: '2024-03-20',
      duration: '60 دقيقة',
      status: 'pending',
      type: 'exam'
    },
    {
      title: 'واجب الفيزياء',
      dueDate: '2024-03-18',
      status: 'completed',
      grade: '90%',
      type: 'assignment'
    },
    {
      title: 'اختبار قصير - الكيمياء',
      dueDate: '2024-03-15',
      duration: '30 دقيقة',
      status: 'overdue',
      type: 'quiz'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">التقييم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{assessment.title}</h3>
              {assessment.status === 'completed' && (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              )}
              {assessment.status === 'pending' && (
                <Clock className="h-5 w-5 text-blue-600" />
              )}
              {assessment.status === 'overdue' && (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                تاريخ التسليم: {assessment.dueDate}
              </p>
              {assessment.duration && (
                <p className="text-sm text-gray-600">
                  المدة: {assessment.duration}
                </p>
              )}
              {assessment.grade && (
                <p className="text-sm font-medium text-emerald-600">
                  الدرجة: {assessment.grade}
                </p>
              )}
            </div>

            <button
              className={`mt-4 w-full py-2 px-4 rounded-lg ${
                assessment.status === 'completed'
                  ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  : assessment.status === 'overdue'
                  ? 'bg-red-50 text-red-700 hover:bg-red-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {assessment.status === 'completed'
                ? 'عرض النتيجة'
                : assessment.status === 'overdue'
                ? 'متأخر'
                : 'بدء الاختبار'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assessment;