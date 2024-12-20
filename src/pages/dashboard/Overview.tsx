import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Users, BookOpen, GraduationCap, Award, Clock, TrendingUp } from 'lucide-react';
import PerformanceChart from '../../components/dashboard/charts/PerformanceChart';
import EnrollmentChart from '../../components/dashboard/charts/EnrollmentChart';
import GradeDistributionChart from '../../components/dashboard/charts/GradeDistributionChart';

const Overview = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, label: 'إجمالي المستخدمين', value: '1,234', change: '+12%', color: 'text-emerald-600' },
    { icon: BookOpen, label: 'الدورات النشطة', value: '56', change: '+5%', color: 'text-blue-600' },
    { icon: GraduationCap, label: 'الطلاب النشطين', value: '892', change: '+8%', color: 'text-indigo-600' },
    { icon: Award, label: 'معدل النجاح', value: '94%', change: '+2%', color: 'text-purple-600' },
    { icon: Clock, label: 'متوسط وقت التعلم', value: '45 ساعة', change: '+15%', color: 'text-orange-600' },
    { icon: TrendingUp, label: 'معدل إكمال الدورات', value: '78%', change: '+4%', color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">نظرة عامة على النظام</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="mr-4 flex-1">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className="text-sm text-emerald-600 mr-2">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <EnrollmentChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GradeDistributionChart />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-6">النشاط الأخير</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <p className="mr-4 text-gray-600">تم تسجيل طالب جديد في دورة الرياضيات</p>
                <span className="mr-auto text-sm text-gray-500">منذ 30 دقيقة</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;