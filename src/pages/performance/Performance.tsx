import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import PerformanceOverview from './components/PerformanceOverview';
import PerformanceChart from './components/PerformanceChart';
import PerformanceMetrics from './components/PerformanceMetrics';

const Performance = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('performance.title')}</h1>
      <PerformanceOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default Performance;