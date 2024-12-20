import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { BookOpen, Video, FileText } from 'lucide-react';

const Learning = () => {
  const { t } = useTranslation();

  const learningResources = [
    {
      title: 'دورة الرياضيات المتقدمة',
      type: 'course',
      progress: 75,
      lastAccessed: 'منذ ساعة',
      icon: BookOpen,
      color: 'text-emerald-600'
    },
    {
      title: 'محاضرة الفيزياء',
      type: 'video',
      duration: '45 دقيقة',
      icon: Video,
      color: 'text-blue-600'
    },
    {
      title: 'ملخص الكيمياء',
      type: 'document',
      pages: 15,
      icon: FileText,
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">التعلم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningResources.map((resource, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${resource.color} bg-opacity-10`}>
                <resource.icon className={`h-6 w-6 ${resource.color}`} />
              </div>
              <div className="mr-4">
                <h3 className="font-medium">{resource.title}</h3>
                <p className="text-sm text-gray-500">
                  {resource.type === 'course' && `تقدم: ${resource.progress}%`}
                  {resource.type === 'video' && `المدة: ${resource.duration}`}
                  {resource.type === 'document' && `الصفحات: ${resource.pages}`}
                </p>
              </div>
            </div>

            {resource.type === 'course' && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${resource.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  آخر نشاط: {resource.lastAccessed}
                </p>
              </div>
            )}

            <button className="mt-4 w-full py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
              متابعة التعلم
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;