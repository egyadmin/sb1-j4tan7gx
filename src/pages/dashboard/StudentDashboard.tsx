import React from 'react';
import { BookOpen, Award, Clock } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم الطالب</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-emerald-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">الدورات المسجلة</h2>
              <p className="text-3xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-emerald-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">المعدل التراكمي</h2>
              <p className="text-3xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-emerald-600" />
            <div className="mr-4">
              <h2 className="text-lg font-semibold">ساعات الدراسة</h2>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">النشاطات الأخيرة</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <p className="mr-4 text-gray-600">إكمال اختبار مادة الرياضيات</p>
                <span className="mr-auto text-sm text-gray-500">قبل ساعتين</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;