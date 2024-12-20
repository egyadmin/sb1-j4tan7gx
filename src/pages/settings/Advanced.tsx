import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import AdvancedSettings from './components/AdvancedSettings';
import SystemInfo from './components/SystemInfo';
import DeveloperOptions from './components/DeveloperOptions';

const Advanced = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('advanced.title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdvancedSettings />
        <div className="space-y-6">
          <SystemInfo />
          <DeveloperOptions />
        </div>
      </div>
    </div>
  );
};

export default Advanced;