import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { TrendingUp, Users, Award } from 'lucide-react';

const PerformanceOverview = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: TrendingUp,
      label: 'معدل التقدم',
      value: '85%',
      change: '+5%',
      color: 'text-emerald-600'
    },
    {
      icon: Users,
      label: 'معدل المشاركة',
      value: '92%',
      change: '+3%',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      label: 'معدل النجاح',
      value: '88%',
      change: '+7%',
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
              <div className="flex items-center mt-1">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <span className="text-sm text-emerald-600 mr-2">{stat.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceOverview;