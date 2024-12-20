import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const PerformanceMetrics = () => {
  const { t } = useTranslation();

  const metrics = [
    {
      label: 'معدل إكمال الواجبات',
      value: '95%',
      status: 'success',
      icon: CheckCircle
    },
    {
      label: 'متوسط وقت الإجابة',
      value: '2.5 ساعة',
      status: 'warning',
      icon: Clock
    },
    {
      label: 'معدل الأخطاء',
      value: '3%',
      status: 'error',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6">مؤشرات الأداء</h2>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <metric.icon className={`h-5 w-5 ${
                metric.status === 'success' ? 'text-emerald-600' :
                metric.status === 'warning' ? 'text-yellow-600' :
                'text-red-600'
              }`} />
              <span className="mr-3 text-gray-700">{metric.label}</span>
            </div>
            <span className="font-medium">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;