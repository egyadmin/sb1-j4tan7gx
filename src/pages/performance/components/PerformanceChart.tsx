import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { LineChart, TrendingUp } from 'lucide-react';

const PerformanceChart = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">تحليل الأداء</h2>
        <div className="flex items-center text-sm text-gray-500">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+12% هذا الشهر</span>
        </div>
      </div>
      
      <div className="h-64 flex items-center justify-center">
        <LineChart className="h-8 w-8 text-gray-400" />
        <span className="mr-2 text-gray-500">بيانات الرسم البياني</span>
      </div>
    </div>
  );
};

export default PerformanceChart;