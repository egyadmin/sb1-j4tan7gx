import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Shield, Key, AlertTriangle } from 'lucide-react';

const SecurityOverview = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Shield,
      label: 'مستوى الأمان',
      value: 'قوي',
      color: 'text-emerald-600'
    },
    {
      icon: Key,
      label: 'آخر تغيير لكلمة المرور',
      value: 'قبل 30 يوم',
      color: 'text-blue-600'
    },
    {
      icon: AlertTriangle,
      label: 'محاولات الدخول المشبوهة',
      value: '0',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="mr-4">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecurityOverview;